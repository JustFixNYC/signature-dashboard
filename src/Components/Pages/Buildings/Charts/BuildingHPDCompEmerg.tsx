import { APIChartData, BuildingInfo } from "../../../../types/APIDataTypes";
import { BarChart } from "../../../BarChart/BarChart";

type BuildingHPDComplaintsProps = {
  data: APIChartData[];
  buildingInfo: BuildingInfo;
  className?: string;
};

export const BuildingHPDComplaints: React.FC<BuildingHPDComplaintsProps> = ({
  data,
  buildingInfo,
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
      origination_date={buildingInfo.origination_date}
      last_sale_date={buildingInfo.last_sale_date}
      className={className}
    />
  );
};
