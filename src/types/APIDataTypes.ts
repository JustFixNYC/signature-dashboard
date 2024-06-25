export type Borough =
  | "Manhattan"
  | "Bronx"
  | "Brooklyn"
  | "Queens"
  | "Staten Island";

export interface Indicators {
  bbl: string;
  address: number;
  assem_dist: number;
  bip: number;
  bip_500_pct: number;
  borough: number;
  cong_dist: number;
  coun_dist: number;
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
  landlord: number;
  last_rodent_date: number;
  last_rodent_result: number;
  last_sale_date: number;
  lender: number;
  link_acris: string;
  link_dap: string;
  link_dob: string;
  link_hpd: string;
  origination_date: number;
  rs_units: number;
  stsen_dist: number;
  units_nonres: number;
  units_res: number;
  year_built: number;
  zip: number;
}

export type BuildingInfo = {
  landlord_slug: string;
  lender_slug: string;
  water_charges: string;
  lat: string;
  lng: string;
  placeholder_vacate_order: number;
  placeholder_dob_permit_applications: number;
  placeholder_outstanding_water: number;
} & Pick<
  Indicators,
  | "bbl"
  | "address"
  | "borough"
  | "zip"
  | "landlord"
  | "lender"
  | "link_hpd"
  | "link_acris"
  | "link_dob"
  | "link_dap"
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
>;

export type CollectionInfo = {
  collection_name: string;
  collection_slug: string;
  collection_type: string;
  buildings: number;
  bldg_data: BuildingInfo[];
} & Pick<
  Indicators,
  | "bbl"
  | "units_res"
  | "rs_units"
  | "evictions_filed"
  | "hp_active"
  | "bip_500_pct"
  | "hpd_viol_bc_open"
  | "hpd_viol_bc_open_per_unit"
  | "hpd_viol_bc_total"
  | "hpd_viol_bc_total_per_unit"
  | "hpd_comp_emerg_total"
  | "hpd_comp_emerg_total_per_unit"
  | "hpd_erp_orders"
  | "hpd_erp_orders_per_unit"
  | "hpd_erp_charges"
  | "hpd_erp_charges_per_unit"
  | "dob_ecb_viol_open"
  | "dob_ecb_viol_open_per_unit"
  | "water_charges"
  | "debt_total"
  | "debt_per_unit"
>;

export interface ChartData {
  month: string;
  hpdviolations_class_a: number;
  hpdviolations_class_b: number;
  hpdviolations_class_c: number;
  hpdviolations_class_i: number;
  hpdviolations_total: number;
  hpdcomplaints_emergency: number;
  hpdcomplaints_nonemergency: number;
  hpdcomplaints_total: number;
  dobviolations_regular: number;
  dobviolations_ecb: number;
  dobviolations_total: number;
}

export interface LandlordInfo {
  landlord_name: string;
  landlord_slug: string;
  lender_name: string;
  lender_slug: string;
  buildings: number;
  units_res: number;
  hpd_viol_bc_open_per_unit: number;
  debt_per_unit: number;
}
