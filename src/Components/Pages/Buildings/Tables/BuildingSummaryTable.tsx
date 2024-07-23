import {
  BuildingInfo,
  DatasetLastUpdatedData,
} from "../../../../types/APIDataTypes";
import React, { HTMLAttributes } from "react";
import { DetailTable } from "../../../DetailTable/DetailTable";
import { DetailTableRow } from "../../../DetailTable/DetailTableRow";

interface BuildingSummaryTableProps extends HTMLAttributes<HTMLDListElement> {
  data: BuildingInfo;
  lastUpdatedData: DatasetLastUpdatedData[];
}

const keys: Partial<keyof BuildingInfo>[] = [
  "units_res",
  "rs_units",
  "bip",
  "hpd_viol_bc_open",
  "hpd_viol_bc_open_per_unit",
  "hpd_viol_bc_total",
  "hpd_erp_orders",
  "hpd_comp_emerg_total",
  "hpd_comp_apts_pct",
  "hp_total",
  "hp_active",
  "evictions_filed",
  "dob_jobs",
  "dob_ecb_viol_open",
  "hpd_erp_charges",
  "last_sale_date",
  "origination_date",
  "debt_total",
  "debt_per_unit",
];

export const BuildingSummaryTable: React.FC<BuildingSummaryTableProps> = ({
  data,
  lastUpdatedData,
  ...props
}) => {
  const rows = keys.map((key) => {
    return (
      <DetailTableRow
        key={key}
        apiKey={key}
        value={(key === "rs_units" && data[key] === 0) ? "0*" : data[key]}
        lastUpdatedData={lastUpdatedData}
      />
    );
  });

  return <DetailTable {...props}>{rows}</DetailTable>;
};
