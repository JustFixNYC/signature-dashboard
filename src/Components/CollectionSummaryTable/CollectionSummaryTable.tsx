import { CollectionInfo } from "../../types/APIDataTypes";
import React from "react";
import "./style.scss";
import { formatMoney } from "../../util/helpers";

type CollectionSummaryTableProps = {
  data: CollectionInfo;
};

const indicatorDisplayNames = {
  hpd_viol_bc_open: "Open B & C HPD Violations (since 2010)",
  hpd_viol_bc_open_per_unit: "Open B & C HPD Violations, per unit (since 2010)",
  hpd_viol_bc_total: "Total B & C HPD Violations in last 12 months",
  hpd_viol_bc_total_per_unit:
    "Total B & C HPD Violations in last 12 months, per unit",
  hpd_comp_emerg_total: "Total Emergency HPD Complaints in last 12 months",
  hpd_comp_emerg_total_per_unit:
    "Total Emergency HPD Complaints in last 12 months, per unit",
  hpd_comp_heat: "Total HPD Complaints for Heat/Hot Water",
  hpd_comp_water: "Total HPD Complaints for Leak/Mold",
  hpd_comp_pests: "Total HPD Complaints for Pests",
  hpd_comp_apts: "List of Apt Numbers that have complaints in last 12 months",
  hpd_comp_apts_pct:
    "Percent of Units that have HPD Complaints in last 12 months",
  debt_per_unit: "Debt Per Unit (Signature)",
  debt_per_building: "Debt Per Building (Signature)",
  debt_total: "Total Outstanding Debt (Signature)",
  origination_date: "Loan Origination Date (Signature)",
  units_res: "Residential Units",
  year_built: "Year Built",
  units_nonres: "Non-Residential Units (yes/no)",
  landlord: "Landlord",
  lender: "Lender",
  zip: "Zip code",
  address: "Address",
  borough: "Borough",
  assem_dist: "State Assembly District",
  cong_dist: "Congressional District",
  coun_dist: "City Council District",
  stsen_dist: "State Senante District",
};

export const CollectionSummaryTable: React.FC<CollectionSummaryTableProps> = ({
  data,
}) => {
  return (
    <>
      <table className="collection-summary-table">
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
          <tr key="hpd_viol_bc_total">
            <td>{indicatorDisplayNames.hpd_viol_bc_total}</td>
            <td>{data.hpd_viol_bc_total}</td>
          </tr>
          <tr key="hpd_viol_bc_total_per_unit">
            <td>{indicatorDisplayNames.hpd_viol_bc_total_per_unit}</td>
            <td>{data.hpd_viol_bc_total_per_unit}</td>
          </tr>

          <tr key="hpd_comp_emerg_total">
            <td>{indicatorDisplayNames.hpd_comp_emerg_total}</td>
            <td>{data.hpd_comp_emerg_total}</td>
          </tr>
          <tr key="hpd_comp_emerg_total_per_unit">
            <td>{indicatorDisplayNames.hpd_comp_emerg_total_per_unit}</td>
            <td>{data.hpd_comp_emerg_total_per_unit}</td>
          </tr>
          <tr key="debt_per_unit">
            <td>{indicatorDisplayNames.debt_per_unit}</td>
            <td>{formatMoney(data.debt_per_unit)}</td>
          </tr>
          <tr key="debt_per_building">
            <td>{indicatorDisplayNames.debt_per_building}</td>
            <td>{formatMoney(data.debt_per_building)}</td>
          </tr>
          <tr key="units_res">
            <td>{indicatorDisplayNames.units_res}</td>
            <td>{data.units_res}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
