import { APIChartData } from "../../types/APIDataTypes";
import { BarChart } from "./BarChart";

type DOBPermitsChartProps = {
  data: APIChartData[];
  title: React.ReactNode;
  className?: string;
  originationDate?: string;
  lastSaleDate?: string;
};

export const DOBPermitsChart: React.FC<DOBPermitsChartProps> = ({
  data,
  title,
  originationDate,
  lastSaleDate,
  className,
}) => {
  const datasets = [
    {
      label: "Job Applications",
      data: data.map((data) => ({
        x: data.month,
        y: data.dobpermits_jobs,
      })),
      backgroundColor: "#95CFEC",
    },
  ];

  return (
    <BarChart
      datasets={datasets}
      title={title}
      yAxisTitle="DOB Job Applications"
      originationDate={originationDate}
      lastSaleDate={lastSaleDate}
      stacked={true}
      className={className}
    />
  );
};
