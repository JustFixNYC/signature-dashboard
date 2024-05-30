import { BuildingInfo } from "../../types/APIDataTypes";
import React from "react";
import "./style.scss";
import { DISPLAY_NAMES, formatMoney } from "../../util/helpers";

type BuildingSummaryTableProps = {
  data: BuildingInfo;
};

const keys: Partial<keyof BuildingInfo>[] = [
  "hpd_viol_bc_open",
  "hpd_viol_bc_open_per_unit",
  "hpd_viol_bc_total",
  "hpd_viol_bc_total_per_unit",
  "in_aep",
  "in_conh",
  "in_ucp",
  "hpd_comp_emerg_total",
  "last_sale_date",
  "debt_per_unit",
  "debt_total",
  "origination_date",
  "units_res",
  "year_built",
  "landlord",
  "lender",
  "placeholder_violations_pests",
  "placeholder__outstanding_hpd_charges",
  "placeholder__hpd_emerg",
  "placeholder__hpd_erp",
  "placeholder_total_hp_cases",
  "placeholder__active_hp",
  "placeholder__total_evictions",
  "placeholder_active_vacate_orders",
  "placeholder_active_dob_apps",
  "placeholder__dob_open_violations",
  "placeholder__bip_score",
  "placeholder__rent_stab_units"
];

const formatAsMoney = ["debt_per_unit", "debt_total"];
export const BuildingSummaryTable: React.FC<BuildingSummaryTableProps> = ({
  data,
}) => {
  const rows = keys.map((key) => {
    const name = DISPLAY_NAMES[key];
    let value;

    if (formatAsMoney.includes(key)) {
      value = formatMoney(data[key] as number);
    } else {
      value = data[key];
    }
    return (
      <tr>
        <td>{name}</td>
        <td>{value}</td>
      </tr>
    );
  });
  return (
    <>
      <table className="building-summary-table">
        <tbody>{rows}</tbody>
      </table>
    </>
  );
};
