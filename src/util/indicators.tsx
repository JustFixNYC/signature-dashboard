import { apiKeys } from "./helpers";

type indicatorObj = {
  name: string;
  short_name?: string;
  description?: React.ReactNode;
  format?: "money" | "round" | "percent" | "boolean" | "comma" | "date";
  dataset?: string;
};

const indicatorStringsBuildingOnly: Partial<{
  [key in apiKeys]: indicatorObj;
}> = {
  bbl: {
    name: "BBL",
  },
  address: {
    name: "Address",
    description: (
      <>
        The address on record with DOF for the property. Note that some
        properties have multiple valid addresses, and a single property (unit of
        ownership) can include multiple adjacent buildings.
      </>
    ),
  },
  zip: {
    name: "Zip code",
  },
  borough: {
    name: "Borough",
  },
  units_res: {
    name: "Residential units",
    format: "comma",
  },
  units_nonres: {
    name: "Has non-residential units",
    description:
      "Presence of any non-residential units. May include one or more types of units (offices, retail stores, etc.)",
    format: "boolean",
  },
  year_built: {
    name: "Year built",
  },
  rs_units: {
    name: "Rent-stabilized units",
    description:
      "The number of rent stabilized units most recently registered with DHCR. All properties in the Signature portfolio have rent stabilized units, so any zero values are most likely a reporting error.",
    format: "comma",
  },
  bip: {
    name: "Building Indicator Project (BIP) score",
    short_name: "BIP score",
    description: (
      <>
        0-500 = Scores in this range do not necessary mean that the building is
        stable, since BIP score is a conservative indicator
        <br />
        500+ = More likely to be in physical/financial distress <br />
        800+ = Highly likely to be in physical/financial distress <br />
        <br />
        The BIP score takes into account violation and overdue charge data.
      </>
    ),
    format: "comma",
    dataset: "unhp",
  },
  landlord: {
    name: "Landlord",
  },
  landlord_name: {
    name: "Landlord",
  },
  loan_pool: {
    name: "Loan pool",
  },
  loan_pool_name: {
    name: "Loan pool",
  },
  hpd_viol_bc_open: {
    name: "Open HPD violations (B & C)",
    short_name: "Open B & C violations",
    description: (
      <>
        Number of HPD violations of class B (hazardous) and C (immediately
        hazardous) issued in the last 5 years that have not yet been corrected.
        Read more on{" "}
        <a
          href="https://www.nyc.gov/site/hpd/services-and-information/report-a-maintenance-issue.page"
          target="_blank"
        >
          HPD Violations
        </a>
        .
      </>
    ),
    format: "comma",
    dataset: "hpd_violations",
  },
  hpd_viol_bc_open_per_unit: {
    name: "Open HPD violations (B & C) per unit",
    short_name: "Open B & C violations per unit",
    description: (
      <>
        Number of HPD violations of class B (hazardous) and C (immediately
        hazardous) issued in the last 5 years that have not yet been corrected,
        divided by the number of units. Read more on{" "}
        <a
          href="https://www.nyc.gov/site/hpd/services-and-information/report-a-maintenance-issue.page"
          target="_blank"
        >
          HPD Violations
        </a>
        .
      </>
    ),
    format: "round",
    dataset: "hpd_violations",
  },
  hpd_viol_bc_total: {
    name: "HPD violations (B & C), last 12 mo.",
    short_name: "B & C violations, last 12 mo.",
    description: (
      <>
        Number of HPD violations of class B (hazardous) and C (immediately
        hazardous) issued in the last 12 months. Read more on{" "}
        <a
          href="https://www.nyc.gov/site/hpd/services-and-information/report-a-maintenance-issue.page"
          target="_blank"
        >
          HPD Violations
        </a>
        .
      </>
    ),
    format: "comma",
    dataset: "hpd_violations",
  },
  hpd_viol_bc_total_per_unit: {
    name: "HPD violations (B & C) per unit, last 12 mo.",
    short_name: "B & C violations per unit, last 12 mo.",
    description: (
      <>
        Number of HPD violations of class B (hazardous) and C (immediately
        hazardous) issued in the last 12 months, divided by the number of units.
        Read more on{" "}
        <a
          href="https://www.nyc.gov/site/hpd/services-and-information/report-a-maintenance-issue.page"
          target="_blank"
        >
          HPD Violations
        </a>
        .
      </>
    ),
    format: "round",
    dataset: "hpd_violations",
  },
  hpd_viol_heat: {
    name: "HPD violations for heat/hot water, last 12 mo.",
    short_name: "Violations for heat/hot water, last 12 mo.",
    description: (
      <>
        Number of HPD violations related to lack of heat or hot water issued in
        the last 12 months. Read more on{" "}
        <a
          href="https://www.nyc.gov/site/hpd/services-and-information/report-a-maintenance-issue.page"
          target="_blank"
        >
          HPD Violations
        </a>
        .
      </>
    ),
    format: "comma",
    dataset: "hpd_violations",
  },
  hpd_viol_pests: {
    name: "HPD violations for pests, last 12 mo.",
    short_name: "Violations for pests, last 12 mo.",
    description: (
      <>
        Number of HPD violations related to pests issued in the last 12 months.
        Read more on{" "}
        <a
          href="https://www.nyc.gov/site/hpd/services-and-information/report-a-maintenance-issue.page"
          target="_blank"
        >
          HPD Violations
        </a>
        .
      </>
    ),
    format: "comma",
    dataset: "hpd_violations",
  },
  hpd_viol_water: {
    name: "HPD violations for leak/mold, last 12 mo.",
    short_name: "Violations for leak/mold, last 12 mo.",
    description: (
      <>
        Number of HPD violations related to leaks or mold issued in the last 12
        months. Read more on{" "}
        <a
          href="https://www.nyc.gov/site/hpd/services-and-information/report-a-maintenance-issue.page"
          target="_blank"
        >
          HPD Violations
        </a>
        .
      </>
    ),
    format: "comma",
    dataset: "hpd_violations",
  },
  hpd_comp_emerg_total: {
    name: "HPD complaints (emergency), last 12 mo.",
    short_name: "Emergency complaints, last 12 mo.",
    description: (
      <>
        Number of HPD complaints of emergency class received in the last 12
        months. Read more on{" "}
        <a
          href="https://www.nyc.gov/site/hpd/services-and-information/report-a-maintenance-issue.page"
          target="_blank"
        >
          HPD Complaints
        </a>
        .
      </>
    ),
    format: "comma",
    dataset: "hpd_complaints",
  },
  hpd_comp_emerg_total_per_unit: {
    name: "HPD complaints (emergency) per unit, last 12 mo.",
    short_name: "Emergency complaints per unit, last 12 mo.",
    description: (
      <>
        Number of HPD complaints of emergency class received in the last 12
        months, divided by the number of units. Read more on
        <a
          href="https://www.nyc.gov/site/hpd/services-and-information/report-a-maintenance-issue.page"
          target="_blank"
        >
          HPD Complaints
        </a>
        .
      </>
    ),
    format: "round",
    dataset: "hpd_complaints",
  },
  hpd_comp_heat: {
    name: "HPD complaints for heat/hot water, last 12 mo.",
    short_name: "Complaints for heat/hot water, last 12 mo.",
    description: (
      <>
        Number of HPD complaints related to lack of heat or hot water received
        in the last 12 months. Read more on
        <a
          href="https://www.nyc.gov/site/hpd/services-and-information/report-a-maintenance-issue.page"
          target="_blank"
        >
          HPD Complaints
        </a>
        .
      </>
    ),
    format: "comma",
    dataset: "hpd_complaints",
  },
  hpd_comp_pests: {
    name: "HPD complaints for pests, last 12 mo.",
    short_name: "Complaints for pests, last 12 mo.",
    description: (
      <>
        Number of HPD complaints related to lack of pests received in the last
        12 months. Read more on
        <a
          href="https://www.nyc.gov/site/hpd/services-and-information/report-a-maintenance-issue.page"
          target="_blank"
        >
          HPD Complaints
        </a>
        .
      </>
    ),
    format: "comma",
    dataset: "hpd_complaints",
  },
  hpd_comp_water: {
    name: "HPD complaints for leak/mold, last 12 mo.",
    short_name: "Complaints for leak/mold, last 12 mo.",
    description: (
      <>
        Number of HPD complaints related to leaks or mold received in the last
        12 months. Read more on
        <a
          href="https://www.nyc.gov/site/hpd/services-and-information/report-a-maintenance-issue.page"
          target="_blank"
        >
          HPD Complaints
        </a>
        .
      </>
    ),
    format: "comma",
    dataset: "hpd_complaints",
  },
  hpd_comp_apts: {
    name: "Units with HPD complaints, last 12 mo.",
    description: (
      <>
        List of all apartments in the building that have submitted any HPD
        complaints in the last 12 months. Read more on
        <a
          href="https://www.nyc.gov/site/hpd/services-and-information/report-a-maintenance-issue.page"
          target="_blank"
        >
          HPD Complaints
        </a>
        .
      </>
    ),
    dataset: "hpd_complaints",
  },
  hpd_comp_apts_pct: {
    name: "Percent of units with HPD complaints, last 12 mo.",
    short_name: "Percent of units with complaints, last 12 mo ",
    description: (
      <>
        The percent of all apartments in the building that have submitted any
        HPD complaints in the last 12 months. Read more on
        <a
          href="https://www.nyc.gov/site/hpd/services-and-information/report-a-maintenance-issue.page"
          target="_blank"
        >
          HPD Complaints
        </a>
        .
      </>
    ),
    format: "percent",
    dataset: "hpd_complaints",
  },
  evictions_filed: {
    name: "Eviction cases filed, last 12 mo.",
    description:
      "Eviction cases filed by the landlord in housing court. This is the first step in the court process, and the case may later get dismissed, settled in or out of court, or eventually result in a executed eviction warrant. Values cannot be reported for buildings with fewer than 11 units.",
    format: "comma",
    dataset: "oca_address",
  },
  evictions_executed: {
    name: "Eviction warrants executed, last 12 mo.",
    description:
      "Warrants for eviction against a tenant that are executed by the city marshals. This is the final outcome in cases where there is a possessory judgement against the tenant.",
    format: "comma",
    dataset: "marshal_evictions",
  },
  in_aep: {
    name: "In Alternative Enforcement Program",
    description: (
      <>
        The Alternative Enforcement Program (AEP) is an HPD program for
        buildings many violations. The goal is to improve conditions with more
        frequent inspections to monitor correction of violations, and issue
        Orders to Correct if the landlord fails to act. The program also allows
        HPD to make repairs and replace building systems if necessary. Read more
        on{" "}
        <a
          href="https://www.nyc.gov/site/hpd/services-and-information/alternative-enforcement-program-aep.page"
          target="_blank"
        >
          AEP
        </a>
        .
      </>
    ),
    format: "boolean",
    dataset: "hpd_aep",
  },
  in_conh: {
    name: "In Certificate of No Harassment (CONH) pilot program",
    short_name: "In Certificate of No Harassment pilot program",
    description: (
      <>
        A local law that applies to some residential buildings requires the
        landlord to apply for and receive a Certification of No Harassment
        (CONH) before applying to the Department of Buildings (DOB) for a permit
        to change the use or occupancy of a building or to demolish a building
        or any part thereof. HPD selected a set of buildings that are subject to
        other enforcement programs or have serious with existing conditions to
        be included in a pilot program for CONH. Read more on{" "}
        <a
          href="https://www.nyc.gov/site/hpd/services-and-information/certification-of-no-harassment-conh.page"
          target="_blank"
        >
          CONH
        </a>
      </>
    ),
    format: "boolean",
    dataset: "hpd_conh",
  },
  in_ucp: {
    name: "In Underlying Conditions Program",
    description: (
      <>
        The Underlying Conditions Program allows HPD to issue an administrative
        order to landlords to correct underlying conditions that have caused, or
        are causing, a violation. HPD selects approximately 50-100 buildings for
        participation in the program each year based on the number of apartments
        affected and the number and severity of the violations. Read more on the
        <a
          href="https://www.nyc.gov/site/hpd/services-and-information/underlying-conditions-program-ll6.page"
          target="_blank"
        >
          Underlying Conditions Program
        </a>
        .
      </>
    ),
    format: "boolean",
    dataset: "hpd_underlying_conditions",
  },
  debt_per_unit: {
    name: "Signature debt per unit",
    description: (
      <>
        The total debt originated divided by the number of residential units.
        Debt per unit can be used as a proxy to understand how a property was
        valued by the lender and investor, and (depending on the geography, type
        of building, and year of mortgage origination) whether the mortgage is
        likely to be speculative in nature.
      </>
    ),
    format: "money",
    dataset: "unhp",
  },
  debt_total: {
    name: "Signature debt",
    description: (
      <>
        The total mortgage amount at origination. For "portfolio loans", or
        mortgages on multiple properties, amounts are assigned as a proportion
        of the residential units in the individual building to the total
        residential units in the portfolio of buildings.
      </>
    ),
    format: "money",
    dataset: "unhp",
  },
  origination_date: {
    name: "Signature loan origination date",
    description: (
      <>
        The date that the mortgage was originated, according to ACRIS property
        records.
      </>
    ),
    format: "date",
    dataset: "unhp",
  },
  last_sale_date: {
    name: "Last sale date",
    description: (
      <>
        The date of the most recent sale of the property (deed transfer),
        according to ACRIS property records..
      </>
    ),
    dataset: "acris",
    format: "date",
  },
  hp_active: {
    name: "Active HPD litigation cases",
    short_name: "Active cases",
    description: (
      <>
        Ongoing cases in housing court against landlords for conditions and/or
        harassment, initiated by tenants or HPD. Read more on{" "}
        <a
          href="https://data.cityofnewyork.us/Housing-Development/Housing-Litigations/59kj-x8nc/about_data"
          target="_blank"
        >
          HPD Litigation
        </a>
        .
      </>
    ),
    format: "comma",
    dataset: "hpd_litigations",
  },
  hp_total: {
    name: "Total HPD litigation cases",
    short_name: "Total cases",
    description: (
      <>
        All cases in housing court against landlords for conditions and/or
        harassment, initiated by tenants or HPD, since August 2006. Read more on
        <a
          href="https://data.cityofnewyork.us/Housing-Development/Housing-Litigations/59kj-x8nc/about_data"
          target="_blank"
        >
          HPD Litigation
        </a>
        .
      </>
    ),
    format: "comma",
    dataset: "hpd_litigations",
  },
  hp_penalies: {
    name: "Civil penalties from HPD litigation cases",
    short_name: "Civil penalties from cases",
    description: (
      <>
        Total penalties from HPD litigation cases against a landlord for
        conditions and/or harassment where there is an outstanding judgement.
        Read more on
        <a
          href="https://data.cityofnewyork.us/Housing-Development/Housing-Litigations/59kj-x8nc/about_data"
          target="_blank"
        >
          HPD Litigation
        </a>
        .
      </>
    ),
    format: "money",
    dataset: "hpd_litigations",
  },
  hp_find_harassment: {
    name: "HPD litigation cases with harassment finding",
    short_name: "Cases with harassment finding",
    description: (
      <>
        Number of HPD litigation cases against a landlord where there was a
        finding of harassment, since August 2006. Read more on
        <a
          href="https://data.cityofnewyork.us/Housing-Development/Housing-Litigations/59kj-x8nc/about_data"
          target="_blank"
        >
          HPD Litigation
        </a>
        .
      </>
    ),
    format: "comma",
    dataset: "hpd_litigations",
  },
  hp_open_judgements: {
    name: "HPD litigation cases with outstanding judgement",
    short_name: "Cases with outstanding judgement",
    description: (
      <>
        Number of HPD litigation cases against a landlord for conditions and/or
        harassment with an outstanding judgement, since August 2006. Read more
        on
        <a
          href="https://data.cityofnewyork.us/Housing-Development/Housing-Litigations/59kj-x8nc/about_data"
          target="_blank"
        >
          HPD Litigation
        </a>
        .
      </>
    ),
    format: "comma",
    dataset: "hpd_litigations",
  },
  water_charges: {
    name: "Overdue water charges",
    description: (
      <>
        Overdue water charges are an important indicator of distress, as it is
        often the first payment that landlords will delay when trying to cut
        costs.
      </>
    ),
    format: "money",
    dataset: "unhp",
  },
  dob_ecb_viol_open: {
    name: "Open DOB/ECB violations",
    description: (
      <>
        Number of violations issued by the Department of Buildings (DOB) in the
        last 5 years that have yet to be corrected. DOB violations are notices
        that a property is not in compliance with applicable law, usually a
        building code and typically relate to building-wide services (like
        elevators or boilers), the structural integrity of a property, or
        illegal construction. ECB (Environment Control Board) are a specific
        violation of NYC Construction Codes or Zoning Resolution, and come with
        additional penalties. Read more on{" "}
        <a
          href="https://www.nyc.gov/site/buildings/safety/dob-violations.page"
          target="_blank"
        >
          DOB/ECB Violations
        </a>
        .
      </>
    ),
    format: "comma",
    dataset: "dob_violations",
  },
  dob_ecb_viol_total: {
    name: "DOB/ECB violations, last 12 mo.",
    description: (
      <>
        Number of violations issued by the Department of Buildings (DOB) in the
        last 12 months. DOB violations are notices that a property is not in
        compliance with applicable law, usually a building code and typically
        relate to building-wide services (like elevators or boilers), the
        structural integrity of a property, or illegal construction. ECB
        (Environment Control Board) are a specific violation of NYC Construction
        Codes or Zoning Resolution, and come with additional penalties. Read
        more on{" "}
        <a
          href="https://www.nyc.gov/site/buildings/safety/dob-violations.page"
          target="_blank"
        >
          DOB/ECB Violations
        </a>
        .
      </>
    ),
    format: "comma",
  },
  dob_jobs: {
    name: "DOB job applications, last 12 mo.",
    short_name: "Job applications, last 12 mo.",
    description: (
      <>
        Initial applications a landlord submits to DOB for a planned
        construction job. If approved, landlords can apply for individual
        permits for each piece of work. Read more on{" "}
        <a
          href="https://www.nyc.gov/site/buildings/dob/building-applications-permits.page"
          target="_blank"
        >
          DOB Permits
        </a>
      </>
    ),
    format: "comma",
    dataset: "dobjobs",
  },
  hpd_erp_charges_per_unit: {
    name: "HPD emergency repair charges per unit, last 12 mo.",
    description: (
      <>
        Total cost charged to the landlord for work orders completed as part of
        HPD programs (Emergency Repairs, Alternative Enforcement, etc.) in the
        last 12 months, divided by the total number of units. Read more on{" "}
        <a
          href="https://www.nyc.gov/site/hpd/services-and-information/emergency-repair-program-erp.page"
          target="_blank"
        >
          HPD Emergency Repairs
        </a>
        .
      </>
    ),
    format: "money",
    dataset: "hpd_charges",
  },
  hpd_erp_charges: {
    name: "HPD emergency repair charges, last 12 mo.",
    description: (
      <>
        Total cost charged to the landlord for work orders completed as part of
        HPD programs (Emergency Repairs, Alternative Enforcement, etc.) in the
        last 12 months. Read more on{" "}
        <a
          href="https://www.nyc.gov/site/hpd/services-and-information/emergency-repair-program-erp.page"
          target="_blank"
        >
          HPD Emergency Repairs
        </a>
        .
      </>
    ),
    format: "money",
    dataset: "hpd_charges",
  },
  hpd_erp_orders: {
    name: "HPD emergency repair work orders, last 12 mo.",
    short_name: "Work orders, last 12 mo.",
    description: (
      <>
        Number of work orders as part of HPD programs (Emergency Repairs,
        Alternative Enforcement, etc.) in the last 12 months. Read more on{" "}
        <a
          href="https://www.nyc.gov/site/hpd/services-and-information/emergency-repair-program-erp.page"
          target="_blank"
        >
          HPD Emergency Repairs
        </a>
        .
      </>
    ),
    format: "comma",
    dataset: "hpd_charges",
  },
  hpd_erp_orders_per_unit: {
    name: "HPD emergency repair work orders per unit, last 12 mo.",
    short_name: "Work orders per unit, last 12 mo.",
    description: (
      <>
        Number of work orders as part of HPD programs (Emergency Repairs,
        Alternative Enforcement, etc.) in the last 12 months, divided by the
        number of units. Read more on{" "}
        <a
          href="https://www.nyc.gov/site/hpd/services-and-information/emergency-repair-program-erp.page"
          target="_blank"
        >
          HPD Emergency Repairs
        </a>
        .
      </>
    ),
    format: "round",
    dataset: "hpd_charges",
  },
  last_rodent_date: {
    name: "Date of last rodent inspection",
    description: (
      <>
        Date of the most recent inspection for rodents by the Health Department
        (DOHMH). Read more on{" "}
        <a
          href="https://www.nyc.gov/site/doh/health/health-topics/rats.page"
          target="_blank"
        >
          rodent inspections
        </a>
        .
      </>
    ),
    format: "date",
    dataset: "dohmh_rodent_inspections",
  },
  last_rodent_result: {
    name: "Rodent inspection result",
    description: (
      <>
        The result (pass or fail) of the most recent inspection for rodents by
        the Health Department (DOHMH). Read more on{" "}
        <a
          href="https://www.nyc.gov/site/doh/health/health-topics/rats.page"
          target="_blank"
        >
          rodent inspections
        </a>
        .
      </>
    ),
    dataset: "dohmh_rodent_inspections",
  },
  hpd_active_vacate: {
    name: "Active HPD Vacate Order",
    description: (
      <>
        Issue date of HPD vacate order for the building that has not yet been
        rescinded. Vacate orders can apply to the entire building or one or more
        individual units (partial). Read more on{" "}
        <a
          href="https://www.nyc.gov/site/hpd/services-and-information/orders.page"
          target="_blank"
        >
          HPD Vacate Orders
        </a>
        .
      </>
    ),
    dataset: "hpd_vacateorders",
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
  lat: {
    name: "Latitude",
  },
  lng: {
    name: "Longitude",
  },
};

export const INDICATOR_STRINGS: Partial<{ [key in apiKeys]: indicatorObj }> = {
  ...indicatorStringsBuildingOnly,
  buildings_agg: {
    name: "Buildings",
    description:
      "The number of formerly Signature financed properties in the portfolio.",
    format: "comma",
  },
  bip_500_pct_agg: {
    name: "Percent of buildings with BIP score 500+",
    description:
      "The percent of buildings within the portfolio that are likely to be in physical or financial distress, according to the Building Indicator Project (BIP) Database.",
    format: "percent",
    dataset: "unhp",
  },
  units_res_agg: {
    ...indicatorStringsBuildingOnly.units_res!,
    description:
      "Total number of residential units across all of the formerly Signature financed buildings in this portfolio",
  },
  rs_units_agg: {
    ...indicatorStringsBuildingOnly.rs_units!,
    description:
      "Total number of rent stabilized units most recently registered with DHCR across all formerly Signature financed properties in the portfolio. While all properties in the Signature portfolio have rent stabilized units, some have not registered with DHCR so this number will be an under count.",
  },
  evictions_filed_agg: {
    ...indicatorStringsBuildingOnly.evictions_filed!,
    description:
      "Number of eviction cases filed by the landlord in housing court across all formerly Signature financed buildings in this portfolio that have at least 11 residential units. This is the first step in the court process, and the case may later get dismissed, settled in or out of court, or eventually result in a executed eviction warrant.",
  },
  hp_active_agg: {
    ...indicatorStringsBuildingOnly.hp_active!,
  },
  hpd_erp_orders_agg: {
    ...indicatorStringsBuildingOnly.hpd_erp_orders!,
  },
  hpd_erp_orders_per_unit_agg: {
    ...indicatorStringsBuildingOnly.hpd_erp_orders_per_unit!,
  },
  hpd_erp_charges_agg: {
    ...indicatorStringsBuildingOnly.hpd_erp_charges!,
  },
  hpd_erp_charges_per_unit_agg: {
    ...indicatorStringsBuildingOnly.hpd_erp_charges_per_unit!,
  },
  hpd_viol_bc_open_agg: {
    ...indicatorStringsBuildingOnly.hpd_viol_bc_open!,
  },
  hpd_viol_bc_open_per_unit_agg: {
    ...indicatorStringsBuildingOnly.hpd_viol_bc_open_per_unit!,
  },
  hpd_viol_bc_total_agg: {
    ...indicatorStringsBuildingOnly.hpd_viol_bc_total!,
  },
  hpd_viol_bc_total_per_unit_agg: {
    ...indicatorStringsBuildingOnly.hpd_viol_bc_total_per_unit!,
  },
  hpd_comp_emerg_total_agg: {
    ...indicatorStringsBuildingOnly.hpd_comp_emerg_total!,
  },
  hpd_comp_emerg_total_per_unit_agg: {
    ...indicatorStringsBuildingOnly.hpd_comp_emerg_total_per_unit!,
  },
  dob_ecb_viol_open_agg: {
    ...indicatorStringsBuildingOnly.dob_ecb_viol_open!,
  },
  dob_ecb_viol_open_per_unit_agg: {
    ...indicatorStringsBuildingOnly.dob_ecb_viol_open_per_unit!,
  },
  water_charges_agg: {
    ...indicatorStringsBuildingOnly.water_charges!,
  },
  debt_total_agg: {
    ...indicatorStringsBuildingOnly.debt_total!,
  },
  debt_per_unit_agg: {
    ...indicatorStringsBuildingOnly.debt_per_unit!,
  },
};
