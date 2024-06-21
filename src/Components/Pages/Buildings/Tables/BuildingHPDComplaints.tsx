import { HTMLAttributes } from "react";
import { BuildingInfo } from "../../../../types/APIDataTypes";
import { DetailTable } from "../../../DetailTable/DetailTable";
import { DetailTableRow } from "../../../DetailTable/DetailTableRow";
import { formatPercent } from "../../../../util/helpers";

interface BuildingHPDComplaintsTable extends HTMLAttributes<HTMLDListElement> {
  data: BuildingInfo;
}

export const BuildingHPDComplaintsTable: React.FC<
  BuildingHPDComplaintsTable
> = ({ data, ...props }) => {
  return (
    <DetailTable {...props}>
      <DetailTableRow
        apiKey={"hpd_comp_emerg_total"}
        value={data["hpd_comp_emerg_total"]}
      />
      <DetailTableRow
        apiKey={"hpd_comp_emerg_total_per_unit"}
        value={formatPercent(data["hpd_comp_emerg_total_per_unit"])}
      />
      <DetailTableRow apiKey={"hpd_comp_apts"} value={data["hpd_comp_apts"]} />
      <DetailTableRow
        apiKey={"hpd_comp_apts_pct"}
        value={data["hpd_comp_apts_pct"]}
      />
      <DetailTableRow apiKey={"hpd_comp_heat"} value={data["hpd_comp_heat"]} />
      <DetailTableRow
        apiKey={"hpd_comp_pests"}
        value={data["hpd_comp_pests"]}
      />
      <DetailTableRow
        apiKey={"hpd_comp_water"}
        value={data["hpd_comp_water"]}
      />
    </DetailTable>
  );
};
