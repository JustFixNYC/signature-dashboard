import { HTMLAttributes } from "react";
import { BuildingInfo } from "../../../types/APIDataTypes";
import { DetailTable } from "../../DetailTable/DetailTable";
import { DetailTableRow } from "../../DetailTable/DetailTableRow";

interface BuildingFinancialTable extends HTMLAttributes<HTMLDListElement> {
  data: BuildingInfo;
}

export const BuildingFinancialTable: React.FC<BuildingFinancialTable> = ({
  data,
  ...props
}) => {
  return (
    <DetailTable {...props}>
      <DetailTableRow apiKey={"debt_per_unit"} value={data["debt_per_unit"]} />
      <DetailTableRow apiKey={"debt_total"} value={data["debt_total"]} />
      <DetailTableRow
        apiKey={"last_sale_date"}
        value={data["last_sale_date"]}
      />
      <DetailTableRow
        apiKey={"origination_date"}
        value={data["origination_date"]}
      />
    </DetailTable>
  );
};
