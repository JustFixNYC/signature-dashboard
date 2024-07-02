import { APIChartData } from "../../types/APIDataTypes";
import { BarChart } from "./BarChart";

type HPDERPChargesChartChartProps = {
  data: APIChartData[];
  className?: string;
  originationDate?: string;
  lastSaleDate?: string;
};

export const HPDERPChargesChart: React.FC<HPDERPChargesChartChartProps> = ({
  data,
  originationDate,
  lastSaleDate,
  className,
}) => {
  const datasets = [
    {
      label: "Charges",
      data: data.map((data) => ({
        x: data.month,
        y: data.hpderp_charges,
      })),
      backgroundColor: "#95CFEC",
    },
  ];

  return (
    <BarChart
      datasets={datasets}
      yAxisTitle="ERP Charges"
      originationDate={originationDate}
      lastSaleDate={lastSaleDate}
      stacked={true}
      className={className}
    />
  );
};
