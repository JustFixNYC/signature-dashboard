import { createColumnHelper } from "@tanstack/react-table";
import { BuildingInfo } from "../../types/APIDataTypes";
import { DISPLAY_NAMES } from "../../util/helpers";

const columnHelper = createColumnHelper<BuildingInfo>();

const columnAccessors: Partial<keyof BuildingInfo>[] = [
  "address",
  "zip",
  "borough",
  "hpd_viol_bc_open",
  "hpd_viol_bc_open_per_unit",
  "evictions",
  "in_aep",
  "in_conh",
  "in_ucp",
  "hpd_comp_emerg_total",
  "hpd_comp_emerg_total_per_unit",
  "hpd_comp_apts_pct",
  "units_res",
  "year_built",
  "units_nonres",
  "landlord",
  "lender",
  "assem_dist",
  "cong_dist",
  "coun_dist",
  "stsen_dist",
  "placeholder_active_vacate_orders",
  "placeholder__dob_open_violations",
  "placeholder_failed_rodents",
  "placeholder__outstanding_charges_water",
  "placeholder__bip_score",
  "placeholder__rent_stab_units",
  "placeholder__hpd_emerg",
  "placeholder__active_hp",
  "placeholder_elected_official_districts",
  "placeholder__total_evictions",
];

export default columnAccessors.map((accessor) => {
  return columnHelper.accessor(accessor, {
    header: DISPLAY_NAMES[accessor],
  });
});
