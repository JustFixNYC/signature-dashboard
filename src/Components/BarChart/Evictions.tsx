import { APIChartData } from "../../types/APIDataTypes";
import { yearlyChartData, groupData } from "../../util/helpers";
import { BarChart } from "./BarChart";

type EvictionsChartProps = {
  data: APIChartData[];
  className?: string;
  originationDate?: string;
  lastSaleDate?: string;
};

export const EvictionsChart: React.FC<EvictionsChartProps> = ({
  data,
  originationDate,
  lastSaleDate,
  className,
}) => {
  const yearlyFiledData: yearlyChartData[] = groupData(data, "evictions_filed", "year") as yearlyChartData[];
  const yearlyExecutedData: yearlyChartData[] = groupData(data, "evictions_filed", "year") as yearlyChartData[];
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
  return (
    <BarChart
      datasets={datasets}
      yAxisTitle="Evictions"
      originationDate={originationDate}
      lastSaleDate={lastSaleDate}
      timeUnit="year"
      className={className}
    />
  );
};
