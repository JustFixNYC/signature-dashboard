import { APIChartData } from "../../types/APIDataTypes";
import { BarChart } from "./BarChart";

type DOBPermitsChartProps = {
  data: APIChartData[];
  title: React.ReactNode;
  dataUnitName: "building" | "portfolio";
  className?: string;
  originationDate?: string;
  lastSaleDate?: string;
};

export const DOBPermitsChart: React.FC<DOBPermitsChartProps> = ({
  data,
  title,
  dataUnitName,
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

  const dataSum = data.reduce((acc, row) => acc + row.dobpermits_jobs, 0) || 0;

  const dataNote = dataSum === 0 && (
    <p className="chart-note">
      Note: There are no DOB job applications in this {dataUnitName}.
    </p>
  );

  return (
    <BarChart
      datasets={datasets}
      title={title}
      note={dataNote}
      yAxisTitle="DOB Job Applications"
      originationDate={originationDate}
      lastSaleDate={lastSaleDate}
      stacked={true}
      className={className}
    />
  );
};
