import { BuildingInfo, CollectionInfo } from "../types/APIDataTypes";

export function splitBBL(bbl: string) {
  const bblArr = bbl.split("");
  const boro = bblArr.slice(0, 1).join("");
  const block = bblArr.slice(1, 6).join("");
  const lot = bblArr.slice(6, 10).join("");
  return { boro, block, lot };
}

export function formatMoney(amount: number): string {
  const formatmoney = new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  });
  return formatmoney.format(amount);
}

type keys = keyof BuildingInfo | keyof CollectionInfo;

export const DISPLAY_NAMES: Partial<{ [key in keys]: string }> = {
  bbl: "BBL",
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
  evictions_executed: "Total Executed Evictions since [date]",
  in_aep: "In AEP (yes/no)",
  in_conh: "In CONH (yes/no)",
  in_ucp: "HPD Underlying Conditions Program (yes/no)",
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
  stsen_dist: "State Senate District",

  last_sale_date: "Date of Last Sale",

  placeholder__hpd_emerg: "Number of HPD Emergency Repairs since [date]",
  placeholder__hpd_erp: "HPD ERP Charges per Unit",
  placeholder__active_hp: "Active HP Cases",
  placeholder__total_evictions: "Total Eviction Filings since [date]",
  placeholder__dob_open_violations: "Open DOB Violations",
  placeholder__outstanding_charges_water: "Outstanding Charges for Water/Sewer",
  placeholder__debt_per_building: "Debt Per Building (Signature)",
  placeholder__bip_score: "BIP score (violations + charges)",
  placeholder__rent_stab_units: "Rent Stabilized Units",
  placeholder__rent_stab_units_resid_units: "Residential Units",
  placeholder__outstanding_hpd_charges: "Total Outstanding HPD Charges",
  placeholder_active_vacate_orders:
    "(Active) Vacate Order(s) (DOB, HPD, FDNY?)",
  placeholder_failed_rodents: "Failed Rodent Inspections (DOHMH)",
  placeholder_elected_official_districts: "Elected official districts",
  placeholder_violations_pests: "Total HPD Violations for Pests",
  placeholder_total_hp_cases: "Total HP Cases since [date]",
  placeholder_active_dob_apps: "Active DOB Permit Applications",
};
