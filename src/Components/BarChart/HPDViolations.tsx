import { APIChartData } from "../../types/APIDataTypes";
import { BarChart } from "./BarChart";

type HPDViolationsChartProps = {
  data: APIChartData[];
  className?: string;
  originationDate?: string;
  lastSaleDate?: string;
};

export const HPDViolationsChart: React.FC<HPDViolationsChartProps> = ({
  data,
  originationDate,
  lastSaleDate,
  className,
}) => {
  const datasets = [
    {
      label: "Class A",
      data: data.map((data) => ({
        x: data.month,
        y: data.hpdviolations_class_b,
      })),
      backgroundColor: "#95CFEC",
    },
    {
      label: "Class B",
      data: data.map((data) => ({
        x: data.month,
        y: data.hpdviolations_class_b,
      })),
      backgroundColor: "#43B19F",
    },
    {
      label: "Class C",
      data: data.map((data) => ({
        x: data.month,
        y: data.hpdviolations_class_c,
      })),
      backgroundColor: "#AF59A0",
    },
    {
      label: "Class I",
      data: data.map((data) => ({
        x: data.month,
        y: data.hpdviolations_class_i,
      })),
      backgroundColor: "#F1AF81",
    },
  ];
  return (
    <BarChart
      originationDate={originationDate}
      lastSaleDate={lastSaleDate}
      datasets={datasets}
      yAxisTitle="Violations Issued"
      className={className}
    />
  );
};
