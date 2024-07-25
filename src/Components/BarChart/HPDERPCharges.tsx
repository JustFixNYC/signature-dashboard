import { APIChartData } from "../../types/APIDataTypes";
import { BarChart, BarChartDataset } from "./BarChart";

type HPDERPChargesChartProps = {
  data: APIChartData[];
  title: React.ReactNode;
  dataUnitName: "building" | "portfolio";
  className?: string;
  originationDate?: string;
  lastSaleDate?: string;
};

export const HPDERPChargesChart: React.FC<HPDERPChargesChartProps> = ({
  data,
  title,
  dataUnitName,
  originationDate,
  lastSaleDate,
  className,
}) => {
  const datasets: BarChartDataset[] = [
    {
      label: "Charges",
      data: data.map((data) => ({
        x: data.month,
        y: data.hpderp_charges,
      })),
      backgroundColor: "#95CFEC",
    },
  ];

  const dataSum = data.reduce((acc, row) => acc + row.hpderp_charges, 0) || 0;

  const dataNote = dataSum === 0 && (
    <p className="chart-note">
      Note: There are no HPD Emergency Repair Program charges recorded in this{" "}
      {dataUnitName}.
    </p>
  );

  return (
    <BarChart
      datasets={datasets}
      title={title}
      note={dataNote}
      yAxisTitle="ERP Charges"
      originationDate={originationDate}
      lastSaleDate={lastSaleDate}
      stacked={true}
      className={className}
    />
  );
};
