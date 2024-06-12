import { BuildingInfo } from "../../types/APIDataTypes";
import React from "react";
import "./style.scss";
import { formatMoney, INDICATOR_STRINGS } from "../../util/helpers";
import { DetailTable } from "../DetailTable/DetailTable";
import { DetailTableRow } from "../DetailTable/DetailTableRow";

type BuildingSummaryTableProps = {
  data: BuildingInfo;
};

const keys: Partial<keyof BuildingInfo>[] = [
  "bip",
  "hpd_viol_bc_open",
  "hpd_viol_bc_open_per_unit",
  "hpd_viol_bc_total",
  "hpd_erp_orders",
  "hpd_comp_emerg_total",
  "in_aep",
  "in_conh",
  "in_ucp",
  "placeholder_vacate_order",
  "hp_total",
  "hp_active",
  "evictions_filed",
  "placeholder_dob_permit_applications",
  "dob_ecb_viol_open",
  "hpd_erp_charges",
  "last_sale_date",
  "origination_date",
  "debt_total",
  "debt_per_unit",
];

const formatAsMoney = ["debt_per_unit", "debt_total"];
const round = ["hpd_viol_bc_open_per_unit"];

export const BuildingSummaryTable: React.FC<BuildingSummaryTableProps> = ({
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

    if (formatAsMoney.includes(key) && !Number.isNaN(value)) {
      value = formatMoney(value as number);
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

  return <DetailTable className="building-sumary-table">{rows}</DetailTable>;
};
