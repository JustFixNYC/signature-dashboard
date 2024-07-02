import { APIChartData } from "../../types/APIDataTypes";
import { groupData, yearlyChartData } from "../../util/helpers";
import { BarChart } from "./BarChart";

type RentStabilizedUnitsChartProps = {
  data: APIChartData[];
  className?: string;
  originationDate?: string;
  lastSaleDate?: string;
};

export const RentStabilizedUnitsChart: React.FC<
  RentStabilizedUnitsChartProps
> = ({ data, originationDate, lastSaleDate, className }) => {
  const yearlyData: yearlyChartData[] = groupData(data, "rentstab_units", "year") as yearlyChartData[];
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
      yAxisTitle="Rent Stabilized Units"
      originationDate={originationDate}
      lastSaleDate={lastSaleDate}
      stacked={true}
      timeUnit="year"
      className={className}
    />
  );
};
