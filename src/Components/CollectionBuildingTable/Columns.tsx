import { createColumnHelper } from "@tanstack/react-table";
import { BuildingInfo } from "../../types/APIDataTypes";
import { DISPLAY_NAMES } from "../../util/helpers";

const columnHelper = createColumnHelper<BuildingInfo>();

const columnAccessors: Partial<keyof BuildingInfo>[] = [
  "address",
  "zip",
  "borough",
  "bbl",
  "hpd_viol_bc_open",
  "hpd_viol_bc_open_per_unit",
  "placeholder__hpd_emerg",
  "placeholder__hpd_erp",
  "placeholder__active_hp",
  "placeholder__total_evictions",
  "placeholder__hpd_emerg_complaints",
  "placeholder__hpd_emerg_complaints_per_unit",
  "placeholder__dob_open_violations",
  "placeholder__charges_water",
  "placeholder__debt_per_unit",
  "placeholder__debt_per_building",
  "placeholder__bip_score",
  "placeholder__rent_stab_units",
  "placeholder__rent_stab_units_resid_units",
];

export default columnAccessors.map((accessor) => {
  return columnHelper.accessor(accessor, {
    header: DISPLAY_NAMES[accessor],
  });
});
