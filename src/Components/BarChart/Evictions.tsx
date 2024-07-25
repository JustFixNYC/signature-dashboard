import { APIChartData } from "../../types/APIDataTypes";
import { yearlyChartData, groupData } from "../../util/helpers";
import { BarChart } from "./BarChart";

type EvictionsChartProps = {
  data: APIChartData[];
  title: React.ReactNode;
  dataUnitName: "building" | "portfolio";
  units_res: number;
  className?: string;
  originationDate?: string;
  lastSaleDate?: string;
};

export const EvictionsChart: React.FC<EvictionsChartProps> = ({
  data,
  title,
  dataUnitName,
  units_res,
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

  const ocaCanReport = units_res >= 11;
  const ocaNote = !ocaCanReport && (
    <p className="chart-note" key={1}>
      Note: Eviction filings data are not available because the {dataUnitName}{" "}
      has fewer than 11 units.
    </p>
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
