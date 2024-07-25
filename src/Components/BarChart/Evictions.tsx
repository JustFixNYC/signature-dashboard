import { APIChartData, BuildingInfo } from "../../types/APIDataTypes";
import { yearlyChartData, groupData } from "../../util/helpers";
import { BarChart } from "./BarChart";

type EvictionsChartProps = {
  data: APIChartData[];
  title: React.ReactNode;
  dataUnitName: "building" | "portfolio";
  unitsRes: number;
  bldgData?: BuildingInfo[];
  className?: string;
  originationDate?: string;
  lastSaleDate?: string;
};

export const EvictionsChart: React.FC<EvictionsChartProps> = ({
  data,
  title,
  dataUnitName,
  unitsRes,
  bldgData,
  originationDate,
  lastSaleDate,
  className,
}) => {
  const yearlyFiledData: yearlyChartData[] = groupData(
    data,
    "evictions_filed",
    "year"
  ) as yearlyChartData[];
  const yearlyExecutedData: yearlyChartData[] = groupData(
    data,
    "evictions_executed",
    "year"
  ) as yearlyChartData[];
  const datasets = [
    {
      label: "Cases Filed",
      data: yearlyFiledData.map((data) => ({
        x: data.year,
        y: data.evictions_filed,
      })),
      backgroundColor: "#95CFEC",
    },
    {
      label: "Evictions Executed",
      data: yearlyExecutedData.map((data) => ({
        x: data.year,
        y: data.evictions_executed,
      })),
      backgroundColor: "#43B19F",
    },
  ];

  const dataSumExecuted =
    data.reduce((acc, row) => acc + row.evictions_executed, 0) || 0;
  const dataSumFiled =
    data.reduce((acc, row) => acc + row.evictions_filed, 0) || 0;

  let ocaCanReport: boolean = false;
  if (dataUnitName === "building") {
    ocaCanReport = unitsRes >= 11;
  } else if (dataUnitName === "portfolio") {
    const smallBldgs = bldgData!.filter((bldg) => bldg.units_res < 11);
    ocaCanReport = smallBldgs.length === 0;
  }

  const ocaNote =
    dataUnitName === "building" && !ocaCanReport ? (
      <p className="chart-note" key={1}>
        Note: Eviction filings data are not available because the building has
        fewer than 11 units.
      </p>
    ) : (
      dataUnitName === "portfolio" &&
      !ocaCanReport && (
        <p className="chart-note" key={1}>
          Note: This portfolio contains buildings with fewer than 11 units, for
          which eviction filings data is not available.
        </p>
      )
    );

  const dataNote =
    !ocaCanReport && dataSumExecuted === 0 ? (
      <p className="chart-note" key={2}>
        Note: There are no recorded evictions executed in this {dataUnitName}.
      </p>
    ) : (
      ocaCanReport &&
      dataSumExecuted === 0 &&
      dataSumFiled === 0 && (
        <p className="chart-note" key={2}>
          Note: There are no recorded evictions in this {dataUnitName}.
        </p>
      )
    );

  return (
    <BarChart
      datasets={datasets}
      title={title}
      note={
        <>
          {ocaNote}
          {dataNote}
        </>
      }
      yAxisTitle="Evictions"
      originationDate={originationDate}
      lastSaleDate={lastSaleDate}
      timeUnit="year"
      className={className}
    />
  );
};
