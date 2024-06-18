import { HTMLAttributes } from "react";
import { BuildingInfo } from "../../../../types/APIDataTypes";
import { DetailTable } from "../../../DetailTable/DetailTable";
import { DetailTableRow } from "../../../DetailTable/DetailTableRow";

interface BuildingHPDLitigationTable extends HTMLAttributes<HTMLDListElement> {
  data: BuildingInfo;
}

export const BuildingHPDLitigationTable: React.FC<
  BuildingHPDLitigationTable
> = ({ data, ...props }) => {
  return (
    <DetailTable {...props}>
      <DetailTableRow apiKey={"hp_active"} value={data["hp_active"]} />
      <DetailTableRow apiKey={"hp_total"} value={data["hp_total"]} />
      <DetailTableRow
        apiKey={"hp_find_harassment"}
        value={data["hp_find_harassment"]}
      />
      <DetailTableRow
        apiKey={"hp_open_judgements"}
        value={data["hp_open_judgements"]}
      />
      <DetailTableRow apiKey={"hp_penalies"} value={data["hp_penalies"]} />
    </DetailTable>
  );
};
