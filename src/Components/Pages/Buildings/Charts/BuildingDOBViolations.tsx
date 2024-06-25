import { APIChartData, BuildingInfo } from "../../../../types/APIDataTypes";
import { BarChart } from "../../../BarChart/BarChart";

type BuildingDOBViolationsProps = {
  data: APIChartData[];
  buildingInfo: BuildingInfo;
  className?: string;
};

export const BuildingDOBViolations: React.FC<BuildingDOBViolationsProps> = ({
  data,
  buildingInfo,
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
