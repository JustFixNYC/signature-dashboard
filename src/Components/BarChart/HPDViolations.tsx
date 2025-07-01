import { APIChartData } from "../../types/APIDataTypes";
import { BarChart } from "./BarChart";

type HPDViolationsChartProps = {
  data: APIChartData[];
  title: React.ReactNode;
  dataUnitName: "building" | "portfolio";
  className?: string;
  originationDate?: string;
  lastSaleDate?: string;
};

export const HPDViolationsChart: React.FC<HPDViolationsChartProps> = ({
  data,
  title,
  dataUnitName,
  originationDate,
  lastSaleDate,
  className,
}) => {
  const datasets = [
    {
      label: "Class A",
      data: data.map((data) => ({
        x: data.month,
        y: data.hpdviolations_class_a,
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

  const dataSum =
    data.reduce(
      (acc, row) =>
        acc +
        row.hpdviolations_class_a +
        row.hpdviolations_class_b +
        row.hpdviolations_class_c +
        row.hpdviolations_class_i,
      0,
    ) || 0;

  const dataNote = dataSum === 0 && (
    <p className="chart-note">
      Note: There are no HPD violations recorded in this {dataUnitName}.
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
