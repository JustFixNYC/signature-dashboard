import { APIChartData } from "../../types/APIDataTypes";
import { BarChart } from "./BarChart";

type RentStabilizedUnitsChartProps = {
  data: APIChartData[];
  className?: string;
  originationDate?: string;
  lastSaleDate?: string;
};

export const RentStabilizedUnitsChart: React.FC<RentStabilizedUnitsChartProps> = ({
  data,
  originationDate,
  lastSaleDate,
  className,
}) => {
  const datasets = [
    {
      label: "Units",
      data: data.map((data) => ({
        x: data.month,
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
      className={className}
    />
  );
};
