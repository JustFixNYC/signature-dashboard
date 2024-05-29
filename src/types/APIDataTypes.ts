/** Date fields that come from our API Data are strings with the format YYYY-MM-DD */
type APIDate = string;

export type BoroughAbbreviation = "MAN" | "BX" | "BK" | "QNS" | "SI";

export type BuildingInfo = {
  address: string;
  assem_dist: string;
  bbl: string;
  borough: BoroughAbbreviation;
  cong_dist: string;
  coun_dist: string;
  debt_per_unit: number;
  debt_total: number;
  evictions: number;
  hpd_comp_apts: string;
  hpd_comp_apts_pct: number;
  hpd_comp_emerg_total: number;
  hpd_viol_bc_open: number;
  hpd_viol_bc_total: number;
  landlord: string;
  lat: number;
  lender: string;
  lng: number;
  origination_date: string;
  stsen_dist: number;
  units_comm: number;
  units_res: number;
  year_built: APIDate;
  zip: string;
};

export type CollectionInfo = {
      "collection_name": string,
      "collection_slug": string,
      "collection_type": string,
      "buildings": number,
      "units_res": number,
      "evictions": number,
      "hpd_viol_bc_open": number,
      "hpd_viol_bc_open_per_unit": number,
      "hpd_viol_bc_total": number,
      "hpd_viol_bc_total_per_unit": number,
      "hpd_comp_emerg_total": number,
      "hpd_comp_emerg_total_per_unit": number,
      "debt_total": number,
      "debt_per_building": number,
      "debt_per_unit": number,
      "bldg_data": BuildingInfo[]
}