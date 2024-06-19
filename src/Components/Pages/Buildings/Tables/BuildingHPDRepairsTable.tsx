import { HTMLAttributes } from "react";
import { BuildingInfo } from "../../../../types/APIDataTypes";
import { DetailTable } from "../../../DetailTable/DetailTable";
import { DetailTableRow } from "../../../DetailTable/DetailTableRow";

interface BuildingHPDRepairsTable extends HTMLAttributes<HTMLDListElement> {
  data: BuildingInfo;
}

export const BuildingHPDRepairsTable: React.FC<BuildingHPDRepairsTable> = ({
  data,
  ...props
}) => {
  return (
    <DetailTable {...props}>
      <DetailTableRow
        apiKey={"hpd_erp_orders"}
        value={data["hpd_erp_orders"]}
      />
      <DetailTableRow
        apiKey={"hpd_erp_orders_per_unit"}
        value={data["hpd_erp_orders_per_unit"]}
      />
    </DetailTable>
  );
};
