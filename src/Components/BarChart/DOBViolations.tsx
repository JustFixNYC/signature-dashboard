import { APIChartData } from "../../types/APIDataTypes";
import { BarChart } from "./BarChart";

type DOBViolationsChartProps = {
  data: APIChartData[];
  title: React.ReactNode;
  className?: string;
  originationDate?: string;
  lastSaleDate?: string;
};

export const DOBViolationsChart: React.FC<DOBViolationsChartProps> = ({
  data,
  title,
  originationDate,
  lastSaleDate,
  className,
}) => {
  const datasets = [
    {
      label: "Non-ECB",
      data: data.map((data) => ({
        x: data.month,
        y: data.dobviolations_regular,
      })),
      backgroundColor: "#95CFEC",
    },
    {
      label: "ECB",
      data: data.map((data) => ({
        x: data.month,
        y: data.dobviolations_ecb,
      })),
      backgroundColor: "#43B19F",
    },
  ];

  return (
    <BarChart
      datasets={datasets}
      title={title}
      yAxisTitle="Violations Issued"
      originationDate={originationDate}
      lastSaleDate={lastSaleDate}
      stacked={true}
      className={className}
    />
  );
};
