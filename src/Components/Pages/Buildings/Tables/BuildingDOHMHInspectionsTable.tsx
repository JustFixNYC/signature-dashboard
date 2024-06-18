import { HTMLAttributes } from "react";
import { BuildingInfo } from "../../../../types/APIDataTypes";
import { DetailTable } from "../../../DetailTable/DetailTable";
import { DetailTableRow } from "../../../DetailTable/DetailTableRow";

interface BuildingDOHMHInspectionsTable
  extends HTMLAttributes<HTMLDListElement> {
  data: BuildingInfo;
}

export const BuildingDOHMHInspectionsTable: React.FC<
  BuildingDOHMHInspectionsTable
> = ({ data, ...props }) => {
  return (
    <DetailTable {...props}>
      <DetailTableRow
        apiKey={"last_rodent_date"}
        value={data["last_rodent_date"]}
      />
      <DetailTableRow
        apiKey={"last_rodent_result"}
        value={data["last_rodent_result"]}
      />
    </DetailTable>
  );
};
