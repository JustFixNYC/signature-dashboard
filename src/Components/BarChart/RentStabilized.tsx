import { APIChartData } from "../../types/APIDataTypes";
import { groupData, yearlyChartData } from "../../util/helpers";
import { BarChart } from "./BarChart";

type RentStabilizedUnitsChartProps = {
  data: APIChartData[];
  title: React.ReactNode;
  dataUnitName: "building" | "portfolio";
  className?: string;
  originationDate?: string;
  lastSaleDate?: string;
};

export const RentStabilizedUnitsChart: React.FC<
  RentStabilizedUnitsChartProps
> = ({
  data,
  title,
  dataUnitName,
  originationDate,
  lastSaleDate,
  className,
}) => {
  const yearlyData: yearlyChartData[] = groupData(
    data,
    "rentstab_units",
    "year"
  ) as yearlyChartData[];
  const datasets = [
    {
      label: "Units",
      data: yearlyData.map((data) => ({
        x: data.year,
        y: data.rentstab_units,
      })),
      backgroundColor: "#95CFEC",
    },
  ];

  const dataSum = data.reduce((acc, row) => acc + row.rentstab_units, 0) || 0;

  const dataNote = dataSum === 0 && (
    <p className="chart-note">
      Note: There are no rent stabilized units registered in this {dataUnitName},
      however all properties in the Signature portfolio have rent-stabilized
      units so this is most likely a reporting error.
    </p>
  );

  return (
    <BarChart
      datasets={datasets}
      title={title}
      note={dataNote}
      yAxisTitle="Rent Stabilized Units"
      originationDate={originationDate}
      lastSaleDate={lastSaleDate}
      stacked={true}
      timeUnit="year"
      className={className}
    />
  );
};
