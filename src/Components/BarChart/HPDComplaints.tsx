import { APIChartData } from "../../types/APIDataTypes";
import { BarChart } from "./BarChart";

type HPDComplaintsChartProps = {
  data: APIChartData[];
  className?: string;
  originationDate?: string;
  lastSaleDate?: string;
};

export const HPDComplaintsChart: React.FC<HPDComplaintsChartProps> = ({
  data,
  originationDate,
  lastSaleDate,
  className,
}) => {
  const datasets = [
    {
      label: "Emergency",
      data: data.map((data) => ({
        x: data.month,
        y: data.hpdcomplaints_emergency,
      })),
      backgroundColor: "#95CFEC",
    },
    {
      label: "Non-Emergency",
      data: data.map((data) => ({
        x: data.month,
        y: data.hpdcomplaints_nonemergency,
      })),
      backgroundColor: "#43B19F",
    },
  ];

  return (
    <BarChart
      datasets={datasets}
      yAxisTitle="Complaints Received"
      originationDate={originationDate}
      lastSaleDate={lastSaleDate}
      stacked={true}
      className={className}
    />
  );
};
