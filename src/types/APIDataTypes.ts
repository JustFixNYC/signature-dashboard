/** Date fields that come from our API Data are strings with the format YYYY-MM-DD */
type APIDate = string;

export type BoroughAbbreviation = "MAN" | "BX" | "BK" | "QNS" | "SI";

export interface BuildingInfo {
  address: string;
  assem_dist: string;
  bbl: string;
  borough: BoroughAbbreviation;
  cong_dist: string;
  coun_dist: string;
  debt_per_unit: number;
  debt_total: number;
  evictions_executed: number;
  hpd_comp_heat: number;
  hpd_comp_water: number;
  hpd_comp_pests: number;
  hpd_comp_apts: string;
  hpd_comp_apts_pct: number;
  hpd_comp_emerg_total: number;
  hpd_comp_emerg_total_per_unit: number;
  hpd_viol_bc_open: number;
  hpd_viol_bc_open_per_unit: number;
  hpd_viol_bc_total: number;
  hpd_viol_bc_total_per_unit: number;
  placeholder__outstanding_hpd_charges: number;
  landlord: string;
  lat: number;
  lender: string;
  lng: number;
  origination_date: string;
  last_sale_date: string;
  in_aep: number;
  in_conh: number;
  in_ucp: number;
  stsen_dist: number;
  units_comm: number;
  units_res: number;
  units_nonres: number;
  year_built: APIDate;
  zip: string;

  placeholder_active_vacate_orders: number;
  placeholder_failed_rodents: number;
  placeholder_elected_official_districts: number;
  placeholder__hpd_emerg: string;
  placeholder__hpd_erp: string;
  placeholder__active_hp: string;
  placeholder__total_evictions: string;
  placeholder__hpd_emerg_complaints: string;
  placeholder__hpd_emerg_complaints_per_unit: string;
  placeholder__dob_open_violations: string;
  placeholder__outstanding_charges_water: string;
  placeholder__debt_per_unit: string;
  placeholder__debt_per_building: string;
  placeholder__bip_score: string;
  placeholder__rent_stab_units: string;
  placeholder__rent_stab_units_resid_units: string;
  placeholder_violations_pests: number;
  placeholder_total_hp_cases: number;
  placeholder_active_dob_apps: number;
}

export interface CollectionInfo {
  collection_name: string;
  collection_slug: string;
  collection_type: string;
  buildings: number;
  units_res: number;
  evictions: number;
  hpd_viol_bc_open: number;
  hpd_viol_bc_open_per_unit: number;
  hpd_viol_bc_total: number;
  hpd_viol_bc_total_per_unit: number;
  hpd_comp_emerg_total: number;
  hpd_comp_emerg_total_per_unit: number;
  debt_total: number;
  debt_per_building: number;
  debt_per_unit: number;
  placeholder__hpd_emerg: number;
  placeholder__hpd_erp: number;
  placeholder__dob_open_violations: number;
  placeholder__outstanding_charges_water: string;
  placeholder__bip_score: number;
  placeholder__rent_stab_units: number;
  placeholder__outstanding_hpd_charges: number;
  placeholder__total_evictions: number;
  bldg_data: BuildingInfo[];
}
