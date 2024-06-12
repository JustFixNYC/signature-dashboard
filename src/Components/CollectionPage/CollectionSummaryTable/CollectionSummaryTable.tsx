import React from "react";
import { CollectionInfo } from "../../../types/APIDataTypes";
import { DetailTable } from "../../DetailTable/DetailTable";
import { DetailTableRow } from "../../DetailTable/DetailTableRow";
import "./style.scss";

type CollectionSummaryTableProps = {
  data: CollectionInfo;
};

const keys: Partial<keyof Omit<CollectionInfo, "bldg_data">>[] = [
  "evictions_filed",
  "rs_units",
  "bip_500_pct",
  "debt_per_building",
  "debt_per_unit",
  "dob_ecb_viol_open",
  "hp_active",
  "hpd_comp_emerg_total",
  "hpd_comp_emerg_total_per_unit",
  "hpd_erp_charges_per_unit",
  "hpd_erp_orders",
  "hpd_viol_bc_open_per_unit",
  "hpd_viol_bc_total_per_unit",
  "units_res",
];

export const CollectionSummaryTable: React.FC<CollectionSummaryTableProps> = ({
  data,
}) => {
  const rows = keys.map((key) => {
    return <DetailTableRow key={key} apiKey={key} value={data[key]} />;
  });

  return <DetailTable className="collection-summary-table">{rows}</DetailTable>;
};
