import { BuildingInfo } from "../../types/APIDataTypes";
import React from "react";
import "./style.scss";
import { formatMoney } from "../../util/helpers";

type BuildingSummaryTableProps = {
  data: BuildingInfo;
};

const indicatorDisplayNames = {
  hpd_viol_bc_open: 'Open B & C HPD Violations',
  hpd_viol_bc_total: 'Total B & C HPD Violations since [date]',
  hpd_comp_emerg_total: 'Total Emergency HPD Complaints since [date]',
  debt_per_unit: 'Debt Per Unit (Signature)',
  origination_date: 'Loan Origination Date (Signature)'
}
export const BuildingSummaryTable: React.FC<BuildingSummaryTableProps> = ({
  data,
}) => {
  return (
    <>
      <table className="building-summary-table">
        <thead>
          <tr>
            <th>Indicator</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr key="hpd_viol_bc_open">
            <td>{indicatorDisplayNames.hpd_viol_bc_open}</td>
            <td>{data.hpd_viol_bc_open}</td>
          </tr>
          <tr key="hpd_viol_bc_total">
            <td>{indicatorDisplayNames.hpd_viol_bc_total}</td>
            <td>{data.hpd_viol_bc_total}</td>
          </tr>
          <tr key="hpd_comp_emerg_total">
            <td>{indicatorDisplayNames.hpd_comp_emerg_total}</td>
            <td>{data.hpd_comp_emerg_total}</td>
          </tr>
          <tr key="debt_per_unit">
            <td>{indicatorDisplayNames.debt_per_unit}</td>
            <td>{formatMoney(data.debt_per_unit)}</td>
          </tr>
          <tr key="origination_date">
            <td>{indicatorDisplayNames.origination_date}</td>
            <td>{data.origination_date}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
