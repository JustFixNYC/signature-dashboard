import { CollectionInfo } from "../../../types/APIDataTypes";
import React from "react";
import "./style.scss";
import { formatMoney, INDICATOR_STRINGS } from "../../../util/helpers";
import { DetailTable } from "../../DetailTable/DetailTable";
import { DetailTableRow } from "../../DetailTable/DetailTableRow";

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

const round = [
  "hpd_erp_charges_per_unit",
  "hpd_viol_bc_open_per_unit",
  "hpd_viol_bc_total_per_unit",
  "hpd_comp_emerg_total_per_unit",
];
const formatAsMoney = ["debt_per_unit", "debt_per_building"];

export const CollectionSummaryTable: React.FC<CollectionSummaryTableProps> = ({
  data,
}) => {
  const rows = keys.map((key) => {
    const indicator = INDICATOR_STRINGS[key];
    let value = data[key];
    const name = indicator ? indicator.name : key;
    const description = indicator?.description;

    if (round.includes(key) && typeof value === "number") {
      value = (value as number).toFixed(2);
    }

    if (formatAsMoney.includes(key)) {
      value = formatMoney(data[key] as number);
    }

    return (
      <DetailTableRow
        key={key}
        name={name}
        value={value}
        description={description}
      />
    );
  });

  return <DetailTable className="collection-summary-table">{rows}</DetailTable>;
};
