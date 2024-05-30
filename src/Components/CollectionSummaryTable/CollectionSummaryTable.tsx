import { CollectionInfo } from "../../types/APIDataTypes";
import React from "react";
import "./style.scss";
import { DISPLAY_NAMES, formatMoney } from "../../util/helpers";

type CollectionSummaryTableProps = {
  data: CollectionInfo;
};

export const CollectionSummaryTable: React.FC<CollectionSummaryTableProps> = ({
  data,
}) => {
  return (
    <>
      <table className="collection-summary-table">
        <tbody>
          <tr>
            <td>{DISPLAY_NAMES.hpd_viol_bc_open}</td>
            <td>{data.hpd_viol_bc_open}</td>
          </tr>
          <tr>
            <td>{DISPLAY_NAMES.hpd_viol_bc_total}</td>
            <td>{data.hpd_viol_bc_total}</td>
          </tr>
          <tr>
            <td>{DISPLAY_NAMES.hpd_viol_bc_total_per_unit}</td>
            <td>{data.hpd_viol_bc_total_per_unit}</td>
          </tr>

          <tr>
            <td>{DISPLAY_NAMES.hpd_comp_emerg_total}</td>
            <td>{data.hpd_comp_emerg_total}</td>
          </tr>
          <tr>
            <td>{DISPLAY_NAMES.hpd_comp_emerg_total_per_unit}</td>
            <td>{data.hpd_comp_emerg_total_per_unit}</td>
          </tr>
          <tr>
            <td>{DISPLAY_NAMES.debt_per_unit}</td>
            <td>{formatMoney(data.debt_per_unit)}</td>
          </tr>
          <tr>
            <td>{DISPLAY_NAMES.debt_per_building}</td>
            <td>{formatMoney(data.debt_per_building)}</td>
          </tr>
          <tr>
            <td>{DISPLAY_NAMES.units_res}</td>
            <td>{data.units_res}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
