import { HTMLAttributes } from "react";
import { BuildingInfo } from "../../../../types/APIDataTypes";
import { DetailTable } from "../../../DetailTable/DetailTable";
import { DetailTableRow } from "../../../DetailTable/DetailTableRow";

interface BuildingHPDProgramsTable extends HTMLAttributes<HTMLDListElement> {
  data: BuildingInfo;
}

export const BuildingHPDProgramsTable: React.FC<BuildingHPDProgramsTable> = ({
  data,
  ...props
}) => {
  return (
    <DetailTable {...props}>
      <DetailTableRow apiKey={"in_aep"} value={data["in_aep"]} />
      <DetailTableRow apiKey={"in_conh"} value={data["in_conh"]} />
      <DetailTableRow apiKey={"in_ucp"} value={data["in_ucp"]} />
    </DetailTable>
  );
};
