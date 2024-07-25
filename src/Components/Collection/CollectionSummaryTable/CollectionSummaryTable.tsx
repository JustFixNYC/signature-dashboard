import React from "react";
import {
  CollectionInfo,
  DatasetLastUpdatedData,
} from "../../../types/APIDataTypes";
import { DetailTable } from "../../DetailTable/DetailTable";
import { DetailTableRow } from "../../DetailTable/DetailTableRow";
import "./style.scss";

type CollectionSummaryTableProps = {
  data: CollectionInfo;
  lastUpdatedData: DatasetLastUpdatedData[];
};

const keys: Partial<keyof Omit<CollectionInfo, "bldg_data">>[] = [
  "units_res_agg",
  "buildings_agg",
  "rs_units_agg",
  "bip_500_pct_agg",
  "debt_total_agg",
  "debt_per_unit_agg",
  "evictions_filed_agg",
  "hp_active_agg",
  "hpd_comp_emerg_total_agg",
  "hpd_comp_emerg_total_per_unit_agg",
  "hpd_erp_charges_per_unit_agg",
  "hpd_erp_orders_agg",
  "hpd_viol_bc_open_per_unit_agg",
  "hpd_viol_bc_total_per_unit_agg",
  "dob_ecb_viol_open_agg",
];

export const CollectionSummaryTable: React.FC<CollectionSummaryTableProps> = ({
  data,
  lastUpdatedData,
}) => {
  const rows = keys.map((key) => {
    return (
      <DetailTableRow
        key={key}
        apiKey={key}
        value={data[key]}
        lastUpdatedData={lastUpdatedData}
      />
    );
  });

  return <DetailTable className="collection-summary-table">{rows}</DetailTable>;
};
