import { APIChartData } from "../../types/APIDataTypes";
import { BarChart } from "./BarChart";

type DOBViolationsChartProps = {
  data: APIChartData[];
  title: React.ReactNode;
  dataUnitName: "building" | "portfolio";
  className?: string;
  originationDate?: string;
  lastSaleDate?: string;
};

export const DOBViolationsChart: React.FC<DOBViolationsChartProps> = ({
  data,
  title,
  dataUnitName,
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

  const dataSum =
    data.reduce(
      (acc, row) => acc + row.dobviolations_regular + row.dobviolations_ecb,
      0
    ) || 0;

  const dataNote = dataSum === 0 && (
    <p className="chart-note">
      Note: There are no DOB/ECB violations in this {dataUnitName}.
    </p>
  );

  return (
    <BarChart
      datasets={datasets}
      title={title}
      note={dataNote}
      yAxisTitle="Violations Issued"
      originationDate={originationDate}
      lastSaleDate={lastSaleDate}
      stacked={true}
      className={className}
    />
  );
};
