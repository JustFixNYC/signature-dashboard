import { APIChartData, BuildingInfo } from "../../../../types/APIDataTypes";
import { BarChart } from "../../../BarChart/BarChart";

type BuildingHPDViolationsProps = {
  data: APIChartData[];
  buildingInfo: BuildingInfo;
  className?: string;
};

export const BuildingHPDViolations: React.FC<BuildingHPDViolationsProps> = ({
  data,
  buildingInfo,
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
      datasets={datasets}
      yAxisTitle="Violations Issued"
      origination_date={buildingInfo.origination_date}
      last_sale_date={buildingInfo.last_sale_date}
      className={className}
    />
  );
};
