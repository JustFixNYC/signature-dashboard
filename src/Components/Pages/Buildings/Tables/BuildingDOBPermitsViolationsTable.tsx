import { HTMLAttributes } from "react";
import { BuildingInfo } from "../../../../types/APIDataTypes";
import { DetailTable } from "../../../DetailTable/DetailTable";
import { DetailTableRow } from "../../../DetailTable/DetailTableRow";

interface BuildingDOBPermitsViolationsTable
  extends HTMLAttributes<HTMLDListElement> {
  data: BuildingInfo;
}

export const BuildingDOBPermitsViolationsTable: React.FC<
  BuildingDOBPermitsViolationsTable
> = ({ data, ...props }) => {
  return (
    <DetailTable {...props}>
      <DetailTableRow apiKey={"dob_jobs"} value={data["dob_jobs"]} />
      <DetailTableRow
        apiKey={"dob_ecb_viol_open"}
        value={data["dob_ecb_viol_open"]}
      />
      <DetailTableRow
        apiKey={"dob_ecb_viol_total"}
        value={data["dob_ecb_viol_total"]}
      />
    </DetailTable>
  );
};
