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
      "The number of rent stabilized units most recently registered with DHCR.",
  },
  hpd_viol_bc_open: {
    name: "Open HPD violations (B & C)",
    description:
      "Number of HPD violations of class B (hazardous) and C (immediately hazardous) issued in the last 5 years that have not yet been corrected. Read more on HPD Violations.",
  },
  hpd_viol_bc_open_per_unit: {
    name: "Open HPD violations (B & C), per unit",
    description:
      "Number of HPD violations of class B (hazardous) and C (immediately hazardous) issued in the last 5 years that have not yet been corrected, divided by the number of units. Read more on HPD Violations.",
    format: "round",
  },
  hpd_viol_bc_total: {
    name: "HPD violations (B & C), last 12 mo.",
    description:
      "Number of HPD violations of class B (hazardous) and C (immediately hazardous) issued in the last 12 months. Read more on HPD Violations.",
  },
  hpd_viol_bc_total_per_unit: {
    name: "HPD violations (B & C), last 12 mo., per unit",
    description:
      "Number of HPD violations of class B (hazardous) and C (immediately hazardous) issued in the last 12 months, divided by the number of units. Read more on HPD Violations.",
    format: "round",
  },
  hpd_viol_heat: {
    name: "HPD violations for heat/hot water, last 12 mo.",
    description:
      "Number of HPD violations related to lack of heat or hot water issued in the last 12 months. Read more on HPD Violations.",
  },
  hpd_viol_pests: {
    name: "HPD violations for pests, last 12 mo.",
    description:
      "Number of HPD violations related to pests issued in the last 12 months. Read more on HPD Violations.",
  },
  hpd_viol_water: {
    name: "HPD violations for leak/mold, last 12 mo.",
    description:
      "Number of HPD violations related to leaks or mold issued in the last 12 months. Read more on HPD Violations.",
  },
  hpd_comp_emerg_total: {
    name: "HPD complaints (emergency), last 12 mo.",
    description:
      "Number of HPD complaints of emergency class received in the last 12 months. Read more on HPD Complaints.",
  },
  hpd_comp_emerg_total_per_unit: {
    name: "HPD complaints (emergency), last 12 mo., per unit",
    description:
      "Number of HPD complaints of emergency class received in the last 12 months, divided by the number of units. Read more on HPD Complaints.",
    format: "round",
  },
  hpd_comp_heat: {
    name: "HPD complaints for heat/hot water, last 12 mo.",
    description:
      "Number of HPD complaints related to lack of heat or hot water received in the last 12 months. Read more on HPD Complaints.",
  },
  hpd_comp_pests: {
    name: "HPD complaints for pests, last 12 mo.",
    description:
      "Number of HPD complaints related to lack of pests received in the last 12 months. Read more on HPD Complaints.",
  },
  hpd_comp_water: {
    name: "HPD complaints for leak/mold, last 12 mo.",
    description:
      "Number of HPD complaints related to leaks or mold received in the last 12 months. Read more on HPD Complaints.",
  },
  hpd_comp_apts: {
    name: "Units with HPD complaints, last 12 mo.",
    description:
      "List of all apartments in the building that have submitted any HPD complaints in the last 12 months. Read more on HPD Complaints.",
  },
  hpd_comp_apts_pct: {
    name: "Percent of units with HPD complaints, last 12 mo.",
    description:
      "The percent of all apartments in the building that have submitted any HPD complaints in the last 12 months. Read more on HPD Complaints.",
  },
  debt_per_unit: {
    name: "Signature debt, per unit",
    description:
      "The total debt originated divided by the number of residential units. Debt per unit can be used as a proxy to understand how a property was valued by the lender and investor, and (depending on the geography, type of building, and year of mortgage origination) whether the mortgage is likely to be speculative in nature.",
    format: "money",
  },
  debt_total: {
    name: "Signature debt",
    description:
      'The total mortgage amount at origination. For "portfolio loans", or mortgages on multiple properties, amounts are assigned as a proportion of the residential units in the individual building to the total residential units in the portfolio of buildings.',
    format: "money",
  },
  evictions_filed: {
    name: "Eviction cases filed, last 12 mo.",
    description:
      "Eviction cases filed by the landlord in housing court. This is the first step in the court process, and the case may later get dismissed, setttled in or out of court, or eventually result in a executed eviction warrant. Values cannot be reported for buildings with fewer than 11 units.",
  },
  evictions_executed: {
    name: "Eviction warrants executed, last 12 mo.",
    description:
      "Warrants for eviction against a tenant that are executed by the city marshals. This is the final outcome in cases where there is a possesory judgement against the tenant.",
  },
  in_aep: {
    name: "Alternative Enforcement Program",
    description:
      "The Alternative Enforcement Program (AEP) is an HPD program for buildings many violations. The goal is to improve conditions with more frequent inspections to monitor correction of violations, and issue Orders to Correct if the landlord fails to act. The program also allows HPD to make repairs and replace building systems if necessary. Read more on AEP.",
  },
  in_conh: {
    name: "Certificate of No Harassment (CONH) pilot program",
    description:
      "A local law that applies to some residential buildings requires the landlord to apply for and receive a Certification of No Harassment (CONH) before applying to the Department of Buildings (DOB) for a permit to change the use or occupancy of a building or to demolish a building or any part thereof. HPD selected a set of buildings that are subject to other enforcement programs or have serious with existing conditions to be included in a pilot program for CONH. REad more on CONH",
  },
  in_ucp: {
    name: "Underlying Conditions Program",
    description:
      "The Underlying Conditions Program allows HPD to issue an administrative order to landlords to correct underlying conditions that have caused, or are causing, a violation. HPD selects approximately 50-100 buildings for participation in the program each year based on the number of apartments affected and the number and severity of the violations. Read more on the Underlying Conditions Program",
  },
  origination_date: {
    name: "Signature loan origination date",
    description:
      "The date that the mortgage was originated, according to ACRIS property records.",
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
    description:
      "The address on record with DOF for the property. Note that some properties have multiple valid addresses, and a single property (unit of ownership) can include multiple adjacent buildings.",
  },
  borough: {
    name: "Borough",
  },
  assem_dist: {
    name: "State Assembly",
  },
  cong_dist: {
    name: "Congressional",
  },
  coun_dist: {
    name: "City Council",
  },
  stsen_dist: {
    name: "State Senate",
  },
  last_sale_date: {
    name: "Last sale date",
    description:
      "The date of the most recent sale of the property (deed transfer), according to ACRIS property records..",
  },
  lat: {
    name: "lat",
  },
  lng: {
    name: "lng",
  },
  buildings: {
    name: "buildings",
    description: "The number of properties in the portfolio.",
  },
  bip: {
    name: "Building Indicator Project (BIP) score",
    description:
      "The BIP score takes into account violation and overdue charge data to come up with an indicator of likely physical or financial distress: a building with a score of 500 or more is likely to be in physical or financial distress, while a building with a score of 800 or more is highly likely to be in physical or financial distress. (Note that the BIP score is a conservative indicator, and scores below 500 do not necessarily indicate that is a building is financially and physically stable.)",
  },
  bip_500_pct: {
    name: "Percent of buildings with BIP score over 500",
    description:
      "The number of buildings within a landlord portfolio that are likely to be in physical or financial distress, according to the Building Indicator Project (BIP) Database.",
  },
  hp_active: {
    name: "Active HPD litigation cases",
    description:
      "Ongoing cases in housing court against landlords for conditions and/or harassment, initiated by tenants or HPD. Read more on HPD Litigation.",
  },
  hp_total: {
    name: "Total HPD litigation cases",
    description:
      "All cases in housing court against landlords for conditions and/or harassment, initiated by tenants or HPD, since August 2006. Read more on HPD Litigation.",
  },
  hp_penalies: {
    name: "Civil penalties from HPD litigation cases",
    description:
      "Total penalties from HPD litigation cases against a landlord for conditions and/or harassment where there is an outstanding judgement. Read more on HPD Litigation.",
    format: "money",
  },
  hp_find_harassment: {
    name: "HPD litigation cases with harassment finding",
    description:
      "Number of HPD litigation cases against a landlord where there was a finding of harassment, since August 2006. Read more on HPD Litigation.",
  },
  hp_open_judgements: {
    name: "HPD litigation cases with outstanding judgement",
    description:
      "Number of HPD litigation cases against a landlord for conditions and/or harassment with an outstanding judgement, since August 2006. Read more on HPD Litigation.",
  },
  water_charges: {
    name: "Overdue water charges",
    description:
      "Overdue water charges are an important indicator of distress, as it is often the first payment that landlords will delay when trying to cut costs.",
  },
  dob_ecb_viol_open: {
    name: "Open DOB/ECB violations",
    description:
      "Number of violations issued by the Department of Buildings (DOB) in the last 5 years that have yet to be corrected. DOB violations are notices that a property is not in compliance with applicable law, usually a building code and typically relate to building-wide services (like elevators or boilers), the structural integrity of a property, or illegal construction. ECB (Environment Control Board) are a specific violation of NYC Construction Codes or Zoning Resolution, and come with additional penalties. Read more on DOB/ECB Violations",
  },
  dob_ecb_viol_total: {
    name: "DOB/ECB violations, last 12 mo.",
    description:
      "Number of violations issued by the Department of Buildings (DOB) in the last 12 months. DOB violations are notices that a property is not in compliance with applicable law, usually a building code and typically relate to building-wide services (like elevators or boilers), the structural integrity of a property, or illegal construction. ECB (Environment Control Board) are a specific violation of NYC Construction Codes or Zoning Resolution, and come with additional penalties. Read more on DOB/ECB Violations",
  },
  dob_jobs: {
    name: "DOB job applications, last 12 mo.",
    description:
      "Initial applications a landlord submits to DOB for a planned construction job. If approved, landlords can apply for individual permits for each piece of work. Read more on DOB Permits",
  },
  hpd_erp_charges_per_unit: {
    name: "HPD emergency repair charges, last 12 mo., per unit",
    description:
      "Total cost charged to the landlord for work orders completed as part of HPD programs (Emergency Repairs, Alternative Enforcement, etc.) in the last 12 months, divided by the total number of units. Read more on HPD Emergency Repairs",
    format: "round",
  },
  hpd_erp_charges: {
    name: "HPD emergency repair charges, last 12 mo.",
    description:
      "Total cost charged to the landlord for work orders completed as part of HPD programs (Emergency Repairs, Alternative Enforcement, etc.) in the last 12 months",
  },
  hpd_erp_orders: {
    name: "HPD emergency repair work orders, last 12 mo.",
    description:
      "Number of work orders as part of HPD programs (Emergency Repairs, Alternative Enforcement, etc.) in the last 12 months. Read more on HPD Emergency Repairs",
  },
  hpd_erp_orders_per_unit: {
    name: "HPD emergency repair work orders, last 12 mo., per unit",
    description:
      "Number of work orders as part of HPD programs (Emergency Repairs, Alternative Enforcement, etc.) in the last 12 months, divided by the number of units. Read more on HPD Emergency Repairs",
    format: "round",
  },
  last_rodent_date: {
    name: "Date of last rodent inspection",
    description:
      "Date of the most recent inspection for rodents by the Health Department (DOHMH). Read more on rodent inspections.",
  },
  last_rodent_result: {
    name: "Rodent inspection result",
    description:
      "The result (pass or fail) of the most recent inspection for rodents by the Health Department (DOHMH). Read more on rodent inspections.",
  },
  placeholder_vacate_order: {
    name: "Active Vacate Order",
    description: "(include links to each agency page to learn more)",
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
