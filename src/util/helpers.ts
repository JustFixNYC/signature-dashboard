import {
  BuildingInfo,
  CollectionInfo,
  Indicators,
} from "../types/APIDataTypes";

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

export type apiKeys =
  | keyof BuildingInfo
  | keyof CollectionInfo
  | keyof Indicators;

type indicatorObj = {
  name: string;
  short_name?: string;
  description?: string;
  format?: "money" | "round";
};

export const INDICATOR_STRINGS: Partial<{ [key in apiKeys]: indicatorObj }> = {
  bbl: {
    name: "BBL",
  },
  rs_units: {
    name: "Rent Stabilized Units",
    description:
      "The number of rent stabilized units registered with DHCR. Taken from DOF tax bills for the property, using the most recent non-zero value from 2019-2022, to account for missing data in a given year due to late or non reporting by landlords.",
  },
  hpd_viol_bc_open: {
    name: "Open B & C HPD Violations (since 2010)",
  },
  hpd_viol_bc_open_per_unit: {
    name: "Open B & C HPD Violations, per unit (since 2010)",
    format: "round",
  },
  hpd_viol_bc_total: {
    name: "Total B & C HPD Violations (since 2010)",
  },
  hpd_viol_bc_total_per_unit: {
    name: "Total B & C HPD Violations in last 12 months, per unit",
    format: "round",
  },
  hpd_viol_heat: {
    name: "Total HPD Violations for Heat/Hot Water in last 12 months",
  },
  hpd_viol_pests: {
    name: "Total HPD Violations for Pests in last 12 months",
  },
  hpd_viol_water: {
    name: "Total HPD Violations for Leak/Mold in last 12 months",
  },
  hpd_comp_emerg_total: {
    name: "Total Emergency HPD Complaints in last 12 months",
  },
  hpd_comp_emerg_total_per_unit: {
    name: "Total Emergency HPD Complaints in last 12 months, per unit",
    format: "round",
  },
  hpd_comp_heat: {
    name: "Total HPD Complaints for Heat/Hot Water",
  },
  hpd_comp_water: {
    name: "Total HPD Complaints for Leak/Mold",
  },
  hpd_comp_pests: {
    name: "Total HPD Complaints for Pests",
  },
  hpd_comp_apts: {
    name: "List of Apt Numbers that have complaints in last 12 months",
  },
  hpd_comp_apts_pct: {
    name: "Percent of Units that have HPD Complaints in last 12 months",
  },
  debt_per_unit: {
    name: "Debt Per Unit (Signature)",
    format: "money",
  },
  debt_per_building: {
    name: "Debt Per Building (Signature)",
    format: "money",
  },
  debt_total: {
    name: "Total Outstanding Debt (Signature)",
    format: "money",
  },
  evictions_executed: {
    name: "Total Executed Evictions since [date]",
    description:
      "Warrants for eviction against the tennat that are executed by the city marshals. This is the final outcome in cases where there is a possesory judgement against the tenant.",
  },
  in_aep: {
    name: "In AEP (yes/no)",
  },
  in_conh: {
    name: "In CONH (yes/no)",
  },
  in_ucp: {
    name: "HPD Underlying Conditions Program (yes/no)",
  },
  origination_date: {
    name: "Loan Origination Date (Signature)",
  },
  units_res: {
    name: "Residential Units",
  },
  year_built: {
    name: "Year Built",
  },
  units_nonres: {
    name: "Non-Residential Units (yes/no)",
  },
  landlord: {
    name: "Landlord",
  },
  lender: {
    name: "Lender",
  },
  zip: {
    name: "Zip code",
  },
  address: {
    name: "Address",
  },
  borough: {
    name: "Borough",
  },
  assem_dist: {
    name: "State Assembly District",
  },
  cong_dist: {
    name: "Congressional District",
  },
  coun_dist: {
    name: "City Council District",
  },
  stsen_dist: {
    name: "State Senate District",
  },
  last_sale_date: {
    name: "Date of Last Sale",
  },
  lat: {
    name: "lat",
  },
  lng: {
    name: "lng",
  },
  buildings: {
    name: "buildings",
  },
  bip: {
    name: "BIP score (violations + charges)",
  },
  bip_500_pct: {
    name: "Percent of building with BIP score over 500",
  },
  evictions_filed: {
    name: "Total Eviction Filings, last 12 mo.",
    description:
      "Eviction cases filed by the landlord in housing court. This is the first step in the court process, and the case may later get dismissed, setttled in or out of court, or eventually result in a executed eviction warrant.",
  },
  hp_total: {
    name: "Total HP Cases since 2006",
    description: "since Aug 2006",
  },
  hpd_erp_orders: {
    name: "Number of HPD Emergency Repair work orders in last 12 months",
  },
  hp_active: {
    name: "Active HP Cases",
  },
  dob_ecb_viol_open: {
    name: "Open DOB/ECB Violations (last 5 years)",
  },
  hpd_erp_charges: {
    name: "HPD ERP Charges in last 12 months",
  },
  hpd_erp_charges_per_unit: {
    name: "HPD ERP Charges in last 12 months per Unit",
    format: "round",
  },
  placeholder_vacate_order: {
    name: "Active Vacate Order",
    description: "(include links to each agency page to learn more)",
  },
  placeholder_dob_permit_applications: {
    name: "Active DOB Permit Applications ",
  },
};

export const DISPLAY_NAMES: { [key: string]: string } = {
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
  placeholder__total_evictions: "Total Eviction Filings since [date]",
  placeholder__dob_open_violations: "Open DOB Violations",
  placeholder__outstanding_charges_water: "Outstanding Charges for Water/Sewer",
  placeholder__bip_score: "BIP score (violations + charges)",
  placeholder__rent_stab_units: "Rent Stabilized Units",
  placeholder__outstanding_hpd_charges: "Total Outstanding HPD Charges",
};
