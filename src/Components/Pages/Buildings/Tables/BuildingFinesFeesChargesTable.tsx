import { HTMLAttributes } from "react";
import { BuildingInfo } from "../../../../types/APIDataTypes";
import { DetailTable } from "../../../DetailTable/DetailTable";
import { DetailTableRow } from "../../../DetailTable/DetailTableRow";

interface BuildingFinesFeesChargesTable
  extends HTMLAttributes<HTMLDListElement> {
  data: BuildingInfo;
}

export const BuildingFinesFeesChargesTable: React.FC<
  BuildingFinesFeesChargesTable
> = ({ data, ...props }) => {
  return (
    <DetailTable {...props}>
      <DetailTableRow apiKey={"water_charges"} value={data["water_charges"]} />
      <DetailTableRow
        apiKey={"hpd_erp_charges"}
        value={data["hpd_erp_charges"]}
      />
      <DetailTableRow
        apiKey={"hpd_erp_charges_per_unit"}
        value={data["hpd_erp_charges_per_unit"]}
      />
    </DetailTable>
  );
};
