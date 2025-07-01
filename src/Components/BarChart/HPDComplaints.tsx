import { APIChartData } from "../../types/APIDataTypes";
import { BarChart } from "./BarChart";

type HPDComplaintsChartProps = {
  data: APIChartData[];
  title: React.ReactNode;
  dataUnitName: "building" | "portfolio";
  className?: string;
  originationDate?: string;
  lastSaleDate?: string;
};

export const HPDComplaintsChart: React.FC<HPDComplaintsChartProps> = ({
  data,
  title,
  dataUnitName,
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

  const dataSum =
    data.reduce(
      (acc, row) =>
        acc + row.hpdcomplaints_emergency + row.hpdcomplaints_nonemergency,
      0,
    ) || 0;

  const dataNote = dataSum === 0 && (
    <p className="chart-note">
      Note: There are no HPD complaints recorded in this {dataUnitName}.
    </p>
  );

  return (
    <BarChart
      datasets={datasets}
      title={title}
      note={dataNote}
      yAxisTitle="Complaints Received"
      originationDate={originationDate}
      lastSaleDate={lastSaleDate}
      stacked={true}
      className={className}
    />
  );
};
