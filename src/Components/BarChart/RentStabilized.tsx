import { APIChartData } from "../../types/APIDataTypes";
import { groupData, yearlyChartData } from "../../util/helpers";
import { BarChart } from "./BarChart";

type RentStabilizedUnitsChartProps = {
  data: APIChartData[];
  title: React.ReactNode;
  className?: string;
  originationDate?: string;
  lastSaleDate?: string;
};

export const RentStabilizedUnitsChart: React.FC<
  RentStabilizedUnitsChartProps
> = ({ data, title, originationDate, lastSaleDate, className }) => {
  const yearlyData: yearlyChartData[] = groupData(
    data,
    "rentstab_units",
    "year",
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

  return (
    <BarChart
      datasets={datasets}
      title={title}
      yAxisTitle="Rent Stabilized Units"
      originationDate={originationDate}
      lastSaleDate={lastSaleDate}
      stacked={true}
      timeUnit="year"
      className={className}
    />
  );
};
