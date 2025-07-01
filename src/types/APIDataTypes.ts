export type Borough =
  | "Manhattan"
  | "Bronx"
  | "Brooklyn"
  | "Queens"
  | "Staten Island";

export const indicatorsTimeSpans = ["month", "quarter", "year"] as const;
export type IndicatorsTimeSpan = (typeof indicatorsTimeSpans)[number];

export interface Indicators {
  bbl: string;
  address: string;
  assem_dist: string;
  bip: number;
  borough: string;
  cong_dist: string;
  coun_dist: string;
  debt_per_unit: number;
  debt_total: number;
  dob_ecb_viol_open: number;
  dob_ecb_viol_total: number;
  dob_ecb_viol_open_per_unit: number;
  dob_jobs: number;
  evictions_executed: number;
  evictions_filed: number;
  hp_active: number;
  hp_find_harassment: number;
  hp_open_judgements: number;
  hp_penalies: number;
  hp_total: number;
  hpd_comp_apts: number;
  hpd_comp_apts_pct: number;
  hpd_comp_emerg_total: number;
  hpd_comp_emerg_total_per_unit: number;
  hpd_comp_heat: number;
  hpd_comp_pests: number;
  hpd_comp_water: number;
  hpd_erp_charges: number;
  hpd_erp_charges_per_unit: number;
  hpd_erp_orders: number;
  hpd_erp_orders_per_unit: number;
  hpd_viol_bc_open: number;
  hpd_viol_bc_open_per_unit: number;
  hpd_viol_bc_total: number;
  hpd_viol_bc_total_per_unit: number;
  hpd_viol_heat: number;
  hpd_viol_pests: number;
  hpd_viol_water: number;
  water_charges: number;
  in_aep: number;
  in_conh: number;
  in_ucp: number;
  landlord: string;
  last_rodent_date: number;
  last_rodent_result: number;
  last_sale_date: string;
  loan_pool: string;
  link_acris: string;
  link_dap: string;
  link_dob: string;
  link_hpd: string;
  link_wow: string;
  link_political: string;
  origination_date: string;
  rs_units: number;
  stsen_dist: string;
  units_nonres: number;
  units_res: number;
  year_built: number;
  zip: string;
  hpd_active_vacate: string;
}

export type BuildingInfo = {
  landlord_slug: string;
  loan_pool_slug: string;
  status_info: LoanStatusData;
  status_current: LoanStatus;
  lat: number;
  lng: number;
} & Pick<
  Indicators,
  | "bbl"
  | "address"
  | "borough"
  | "zip"
  | "landlord"
  | "loan_pool"
  | "link_hpd"
  | "link_acris"
  | "link_dob"
  | "link_dap"
  | "link_wow"
  | "link_political"
  | "units_nonres"
  | "units_res"
  | "rs_units"
  | "year_built"
  | "assem_dist"
  | "stsen_dist"
  | "cong_dist"
  | "coun_dist"
  | "origination_date"
  | "last_sale_date"
  | "debt_total"
  | "debt_per_unit"
  | "bip"
  | "in_aep"
  | "in_conh"
  | "in_ucp"
  | "evictions_executed"
  | "evictions_filed"
  | "hp_total"
  | "hp_open_judgements"
  | "hp_penalies"
  | "hp_find_harassment"
  | "hp_active"
  | "hpd_comp_emerg_total"
  | "hpd_comp_emerg_total_per_unit"
  | "hpd_comp_apts"
  | "hpd_comp_apts_pct"
  | "hpd_comp_heat"
  | "hpd_comp_water"
  | "hpd_comp_pests"
  | "hpd_viol_bc_total"
  | "hpd_viol_bc_open"
  | "hpd_viol_bc_open_per_unit"
  | "hpd_viol_heat"
  | "hpd_viol_water"
  | "hpd_viol_pests"
  | "hpd_erp_orders"
  | "hpd_erp_orders_per_unit"
  | "hpd_erp_charges"
  | "hpd_erp_charges_per_unit"
  | "last_rodent_date"
  | "last_rodent_result"
  | "dob_jobs"
  | "dob_ecb_viol_total"
  | "dob_ecb_viol_open"
  | "water_charges"
  | "hpd_active_vacate"
>;

export type CollectionInfo = {
  collection_name: string;
  collection_slug: string;
  collection_type: string;
  buildings_agg: number;
  units_res_agg: number;
  rs_units_agg: number;
  evictions_filed_agg: number;
  hp_active_agg: number;
  bip_500_pct_agg: number;
  hpd_viol_bc_open_agg: number;
  hpd_viol_bc_open_per_unit_agg: number;
  hpd_viol_bc_total_agg: number;
  hpd_viol_bc_total_per_unit_agg: number;
  hpd_comp_emerg_total_agg: number;
  hpd_comp_emerg_total_per_unit_agg: number;
  hpd_erp_orders_agg: number;
  hpd_erp_orders_per_unit_agg: number;
  hpd_erp_charges_agg: number;
  hpd_erp_charges_per_unit_agg: number;
  dob_ecb_viol_open_agg: number;
  dob_ecb_viol_open_per_unit_agg: number;
  water_charges_agg: number;
  debt_total_agg: number;
  debt_per_unit_agg: number;
  bldg_data: BuildingInfo[];
};

export interface APIChartData {
  month: string;
  hpdviolations_class_a: number;
  hpdviolations_class_b: number;
  hpdviolations_class_c: number;
  hpdviolations_class_i: number;
  hpdviolations_total: number;
  hpdcomplaints_emergency: number;
  hpdcomplaints_nonemergency: number;
  hpdcomplaints_total: number;
  hpderp_charges: number;
  dobviolations_regular: number;
  dobviolations_ecb: number;
  dobviolations_total: number;
  dobpermits_jobs: number;
  rentstab_units: number;
  evictions_executed: number;
  evictions_filed: number;
}

export interface LandlordInfo {
  landlord_name: string;
  landlord_slug: string;
  loan_pool_name: string;
  loan_pool_slug: string;
  buildings_agg: number;
  units_res_agg: number;
  hpd_viol_bc_open_per_unit_agg: number;
  debt_per_unit_agg: number;
}

export interface MapData {
  bbl: string;
  address: string;
  borough: string;
  zip: string;
  landlord: string;
  landlord_slug: string;
  loan_pool_slug: string;
  lat: number;
  lng: number;
}

export interface APIPortfolioData {
  collection_slug: "cpc" | "santander" | "all";
  buildings_agg: number;
  landlords: number;
}

export interface DatasetLastUpdatedData {
  dataset: string;
  last_updated: string;
}

export type LoanStatus =
  | "pending"
  | "left_program"
  | "foreclosure"
  | "refinanced"
  | "write_down"
  | "rehab"
  | "write_down_rehab";

export type LoanLink = {
  url: string;
  label: string;
};

export interface LoanHistory {
  // No need for "pending" entry since it applies to all and we already have
  // origination date
  status: Exclude<LoanStatus, "pending">;
  date: string;
}

export interface LoanStatusData {
  statuses: LoanHistory[];
  links?: LoanLink[];
}
