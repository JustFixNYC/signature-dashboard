import { APIChartData } from "../../types/APIDataTypes";
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
  console.log({data})
  const datasets = [
    {
      label: "Cases Filed",
      data: data.map((data) => ({
        x: data.month,
        y: data.evictions_filed,
      })),
      backgroundColor: "#95CFEC",
    },
    {
      label: "Evictions Executed",
      data: data.map((data) => ({
        x: data.month,
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
      className={className}
    />
  );
};

