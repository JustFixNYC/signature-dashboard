import { BuildingInfo } from "../../types/APIDataTypes";
import React from "react";
import "./style.scss";
import { DISPLAY_NAMES, formatMoney } from "../../util/helpers";

type BuildingSummaryTableProps = {
  data: BuildingInfo;
};

export const BuildingSummaryTable: React.FC<BuildingSummaryTableProps> = ({
  data,
}) => {
  return (
    <>
      <table className="building-summary-table">
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
            <td>{DISPLAY_NAMES.hpd_comp_emerg_total}</td>
            <td>{data.hpd_comp_emerg_total}</td>
          </tr>
          <tr>
            <td>{DISPLAY_NAMES.debt_per_unit}</td>
            <td>{formatMoney(data.debt_per_unit)}</td>
          </tr>
          <tr>
            <td>{DISPLAY_NAMES.origination_date}</td>
            <td>{data.origination_date}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
