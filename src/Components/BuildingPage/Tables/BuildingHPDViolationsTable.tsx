import { HTMLAttributes } from "react";
import { BuildingInfo } from "../../../types/APIDataTypes";
import { DetailTable } from "../../DetailTable/DetailTable";
import { DetailTableRow } from "../../DetailTable/DetailTableRow";

interface BuildingHPDViolationsTable extends HTMLAttributes<HTMLDListElement> {
  data: BuildingInfo;
}

export const BuildingHPDViolationsTable: React.FC<
  BuildingHPDViolationsTable
> = ({ data, ...props}) => {
  return (
    <DetailTable {...props}>
      <DetailTableRow
        apiKey={"hpd_viol_bc_open_per_unit"}
        value={data["hpd_viol_bc_open_per_unit"]}
      />
      <DetailTableRow
        apiKey={"hpd_viol_bc_open"}
        value={data["hpd_viol_bc_open"]}
      />
      <DetailTableRow apiKey={"hpd_viol_heat"} value={data["hpd_viol_heat"]} />
      <DetailTableRow
        apiKey={"hpd_viol_pests"}
        value={data["hpd_viol_pests"]}
      />
      <DetailTableRow
        apiKey={"hpd_viol_water"}
        value={data["hpd_viol_water"]}
      />
    </DetailTable>
  );
};
