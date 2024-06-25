import {
  BuildingInfo,
  CollectionInfo,
  Indicators,
  LandlordInfo,
} from "../types/APIDataTypes";

export function splitBBL(bbl: string) {
  const bblArr = bbl.split("");
  const boro = bblArr.slice(0, 1).join("");
  const block = bblArr.slice(1, 6).join("");
  const lot = bblArr.slice(6, 10).join("");
  return { boro, block, lot };
}

export function formatMoney(amount: number): string {
  if (typeof amount !== "number") {
    return amount;
  }
  const formatmoney = new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  });
  return formatmoney.format(amount);
}

export const formatPercent = (value: number) => {
  if (typeof value !== "number") {
    return value;
  }
  return value.toFixed(0) + "%";
};

export const formatNumber = (value: number) => {
  if (typeof value !== "number") {
    return value;
  }
  return new Intl.NumberFormat("en").format(value);
};

export type apiKeys =
  | keyof BuildingInfo
  | keyof CollectionInfo
  | keyof Indicators
  | keyof LandlordInfo;

type indicatorObj = {
  name: string;
  short_name?: string;
  description?: string;
  format?: "money" | "round" | "percent" | "boolean";
};

export const INDICATOR_STRINGS: Partial<{ [key in apiKeys]: indicatorObj }> = {
  bbl: {
    name: "BBL",
  },
  rs_units: {
    name: "Rent Stabilized Units",
    description:
      "The number of rent stabilized units most recently registered with DHCR. All properties in the Signature portfolio have rent stabilized units, so any zero values are most likely a reporting error.",
  },
  hpd_viol_bc_open: {
    name: "Open HPD violations (B & C)",
    short_name: "Open B & C violations",
    description:
      "Number of HPD violations of class B (hazardous) and C (immediately hazardous) issued in the last 5 years that have not yet been corrected. Read more on HPD Violations.",
  },
  hpd_viol_bc_open_per_unit: {
    name: "Open HPD violations (B & C) per unit",
    short_name: "Open B & C violations per unit",
    description:
      "Number of HPD violations of class B (hazardous) and C (immediately hazardous) issued in the last 5 years that have not yet been corrected, divided by the number of units. Read more on HPD Violations.",
    format: "round",
  },
  hpd_viol_bc_total: {
    name: "HPD violations (B & C), last 12 mo.",
    short_name: "B & C violations, last 12 mo.",
    description:
      "Number of HPD violations of class B (hazardous) and C (immediately hazardous) issued in the last 12 months. Read more on HPD Violations.",
  },
  hpd_viol_bc_total_per_unit: {
    name: "HPD violations (B & C) per unit, last 12 mo.",
    short_name: "B & C violations per unit, last 12 mo.",
    description:
      "Number of HPD violations of class B (hazardous) and C (immediately hazardous) issued in the last 12 months, divided by the number of units. Read more on HPD Violations.",
    format: "round",
  },
  hpd_viol_heat: {
    name: "HPD violations for heat/hot water, last 12 mo.",
    short_name: "Violations for heat/hot water, last 12 mo.",
    description:
      "Number of HPD violations related to lack of heat or hot water issued in the last 12 months. Read more on HPD Violations.",
  },
  hpd_viol_pests: {
    name: "HPD violations for pests, last 12 mo.",
    short_name: "Violations for pests, last 12 mo.",
    description:
      "Number of HPD violations related to pests issued in the last 12 months. Read more on HPD Violations.",
  },
  hpd_viol_water: {
    name: "HPD violations for leak/mold, last 12 mo.",
    short_name: "Violations for leak/mold, last 12 mo.",
    description:
      "Number of HPD violations related to leaks or mold issued in the last 12 months. Read more on HPD Violations.",
  },
  hpd_comp_emerg_total: {
    name: "HPD complaints (emergency), last 12 mo.",
    short_name: "Emergency complaints, last 12 mo.",
    description:
      "Number of HPD complaints of emergency class received in the last 12 months. Read more on HPD Complaints.",
  },
  hpd_comp_emerg_total_per_unit: {
    name: "HPD complaints (emergency) per unit, last 12 mo.",
    short_name: "Emergency complaints per unit, last 12 mo.",
    description:
      "Number of HPD complaints of emergency class received in the last 12 months, divided by the number of units. Read more on HPD Complaints.",
    format: "round",
  },
  hpd_comp_heat: {
    name: "HPD complaints for heat/hot water, last 12 mo.",
    short_name: "Complaints for heat/hot water, last 12 mo.",
    description:
      "Number of HPD complaints related to lack of heat or hot water received in the last 12 months. Read more on HPD Complaints.",
  },
  hpd_comp_pests: {
    name: "HPD complaints for pests, last 12 mo.",
    short_name: "Complaints for pests, last 12 mo.",
    description:
      "Number of HPD complaints related to lack of pests received in the last 12 months. Read more on HPD Complaints.",
  },
  hpd_comp_water: {
    name: "HPD complaints for leak/mold, last 12 mo.",
    short_name: "Complaints for leak/mold, last 12 mo.",
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
    short_name: "Percent of units with complaints, last 12 mo ",
    description:
      "The percent of all apartments in the building that have submitted any HPD complaints in the last 12 months. Read more on HPD Complaints.",
    format: "percent",
  },
  debt_per_unit: {
    name: "Signature debt per unit",
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
    format: "boolean",
  },
  in_conh: {
    name: "Certificate of No Harassment (CONH) pilot program",
    short_name: "Certificate of No Harassment pilot program",
    description:
      "A local law that applies to some residential buildings requires the landlord to apply for and receive a Certification of No Harassment (CONH) before applying to the Department of Buildings (DOB) for a permit to change the use or occupancy of a building or to demolish a building or any part thereof. HPD selected a set of buildings that are subject to other enforcement programs or have serious with existing conditions to be included in a pilot program for CONH. REad more on CONH",
    format: "boolean",
  },
  in_ucp: {
    name: "Underlying Conditions Program",
    description:
      "The Underlying Conditions Program allows HPD to issue an administrative order to landlords to correct underlying conditions that have caused, or are causing, a violation. HPD selects approximately 50-100 buildings for participation in the program each year based on the number of apartments affected and the number and severity of the violations. Read more on the Underlying Conditions Program",
    format: "boolean",
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
    name: "Non-Residential Units",
    description:
      "Presence of any non-residential units. May include one or more types of units (offices, retail stores, etc.)",
    format: "boolean",
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
    name: "Buildings",
    description: "The number of Signature properties in the portfolio.",
  },
  bip: {
    name: "Building Indicator Project (BIP) score",
    short_name: "BIP score",
    description:
      "The BIP score takes into account violation and overdue charge data to come up with an indicator of likely physical or financial distress: a building with a score of 500 or more is likely to be in physical or financial distress, while a building with a score of 800 or more is highly likely to be in physical or financial distress. (Note that the BIP score is a conservative indicator, and scores below 500 do not necessarily indicate that is a building is financially and physically stable.)",
  },
  bip_500_pct: {
    name: "Percent of buildings with BIP score over 500",
    description:
      "The number of buildings within a landlord portfolio that are likely to be in physical or financial distress, according to the Building Indicator Project (BIP) Database.",
    format: "percent",
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
    format: "money",
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
    short_name: "Job applications, last 12 mo.",
    description:
      "Initial applications a landlord submits to DOB for a planned construction job. If approved, landlords can apply for individual permits for each piece of work. Read more on DOB Permits",
  },
  hpd_erp_charges_per_unit: {
    name: "HPD emergency repair charges per unit, last 12 mo.",
    description:
      "Total cost charged to the landlord for work orders completed as part of HPD programs (Emergency Repairs, Alternative Enforcement, etc.) in the last 12 months, divided by the total number of units. Read more on HPD Emergency Repairs",
    format: "money",
  },
  hpd_erp_charges: {
    name: "HPD emergency repair charges, last 12 mo.",
    description:
      "Total cost charged to the landlord for work orders completed as part of HPD programs (Emergency Repairs, Alternative Enforcement, etc.) in the last 12 months",
    format: "money",
  },
  hpd_erp_orders: {
    name: "HPD emergency repair work orders, last 12 mo.",
    short_name: "Work orders, last 12 mo.",
    description:
      "Number of work orders as part of HPD programs (Emergency Repairs, Alternative Enforcement, etc.) in the last 12 months. Read more on HPD Emergency Repairs",
  },
  hpd_erp_orders_per_unit: {
    name: "HPD emergency repair work orders per unit, last 12 mo.",
    short_name: "Work orders per unit, last 12 mo.",
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
  landlord_name: {
    name: "Landlord",
  },
  lender_name: {
    name: "Lender",
  },
};

export const getColumnHeader = (apiKey: apiKeys) => {
  const indicator = INDICATOR_STRINGS[apiKey];
  if (indicator) {
    return indicator.short_name ? indicator.short_name : indicator.name;
  } else {
    return apiKey;
  }
};

export const round = (value: number) => {
  if (typeof value !== "number") {
    return value;
  }
  return value.toFixed(2);
};

export const showYesNo = (value: boolean) => {
  if (value === true) {
    return "yes";
  } else if (value === false) {
    return "no";
  }
};
