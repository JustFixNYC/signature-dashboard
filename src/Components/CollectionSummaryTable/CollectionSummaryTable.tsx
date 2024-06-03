import { CollectionInfo } from "../../types/APIDataTypes";
import React from "react";
import "./style.scss";
import { DISPLAY_NAMES, formatMoney } from "../../util/helpers";

type CollectionSummaryTableProps = {
  data: CollectionInfo;
};

const keys: Partial<keyof Omit<CollectionInfo, "bldg_data">>[] = [
  "hpd_viol_bc_open",
  "hpd_viol_bc_open_per_unit",
  "hpd_viol_bc_total",
  "hpd_comp_emerg_total",
  "hpd_comp_emerg_total_per_unit",
  "debt_per_unit",
  "debt_per_building",
  "units_res",
  "placeholder__dob_open_violations",
  "placeholder__outstanding_charges_water",
  "placeholder__bip_score",
  "placeholder__rent_stab_units",
  "placeholder__hpd_emerg",
  "placeholder__hpd_erp",
  "placeholder__outstanding_hpd_charges",
  "placeholder__total_evictions",
];

const formatAsMoney = ["debt_per_unit", "debt_per_building"];

export const CollectionSummaryTable: React.FC<CollectionSummaryTableProps> = ({
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
      <tr key={key}>
        <td>{name}</td>
        <td>{value}</td>
      </tr>
    );
  });

  return (
    <>
      <table className="collection-summary-table">
        <tbody>{rows}</tbody>
      </table>
    </>
  );
};
