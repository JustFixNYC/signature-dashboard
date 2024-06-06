import { ColumnDef } from "@tanstack/react-table";
import { DISPLAY_NAMES } from "../../util/helpers";
import { BuildingInfo } from "../../types/APIDataTypes";

export const columns: ColumnDef<BuildingInfo, string | number>[] = [
  {
    accessorKey: "address",
    header: DISPLAY_NAMES["address"],
  },
  {
    accessorKey: "zip",
    header: DISPLAY_NAMES["zip"],
    meta: {
      inputWidth: "3rem",
    },
  },
  {
    accessorKey: "borough",
    header: DISPLAY_NAMES["borough"],
    meta: {
      inputWidth: "1.5rem",
    },
  },
  {
    accessorKey: "hpd_viol_bc_open",
    header: DISPLAY_NAMES["hpd_viol_bc_open"],
    meta: {
      filterVariant: "range",
    },
  },
  {
    accessorKey: "hpd_viol_bc_open_per_unit",
    header: DISPLAY_NAMES["hpd_viol_bc_open_per_unit"],
    cell: (info) => (info.getValue() as number).toFixed(2),
    meta: {
      filterVariant: "range",
    },
  },
  {
    accessorKey: "evictions",
    header: DISPLAY_NAMES["evictions"],
    meta: {
      filterVariant: "range",
    },
  },
  {
    accessorKey: "in_aep",
    header: DISPLAY_NAMES["in_aep"],
    meta: {
      filterVariant: "boolean",
    },
  },
  {
    accessorKey: "in_conh",
    header: DISPLAY_NAMES["in_conh"],
    meta: {
      filterVariant: "boolean",
    },
  },
  {
    accessorKey: "in_ucp",
    header: DISPLAY_NAMES["in_ucp"],
    meta: {
      filterVariant: "boolean",
    },
  },
  {
    accessorKey: "hpd_comp_emerg_total",
    header: DISPLAY_NAMES["hpd_comp_emerg_total"],
    meta: {
      filterVariant: "range",
    },
  },
  {
    accessorKey: "hpd_comp_emerg_total_per_unit",
    header: DISPLAY_NAMES["hpd_comp_emerg_total_per_unit"],
  },
  {
    accessorKey: "hpd_comp_apts_pct",
    header: DISPLAY_NAMES["hpd_comp_apts_pct"],
    cell: (info) => ((info.getValue() as number) * 100).toFixed(2) + "%",
    meta: {
      filterVariant: "range",
    },
  },
  {
    accessorKey: "units_res",
    header: DISPLAY_NAMES["units_res"],
    meta: {
      filterVariant: "range",
    },
  },
  {
    accessorKey: "year_built",
    header: DISPLAY_NAMES["year_built"],
    meta: {
      filterVariant: "range",
    },
  },
  {
    accessorKey: "units_nonres",
    header: DISPLAY_NAMES["units_nonres"],
    meta: {
      filterVariant: "boolean",
    },
  },
  {
    accessorKey: "landlord",
    header: DISPLAY_NAMES["landlord"],
  },
  {
    accessorKey: "lender",
    header: DISPLAY_NAMES["lender"],
    meta: {
      inputWidth: "4rem",
    },
  },
  {
    accessorKey: "assem_dist",
    header: DISPLAY_NAMES["assem_dist"],
    meta: {
      inputWidth: "1rem",
    },
  },
  {
    accessorKey: "cong_dist",
    header: DISPLAY_NAMES["cong_dist"],
    meta: {
      inputWidth: "1rem",
    },
  },
  {
    accessorKey: "coun_dist",
    header: DISPLAY_NAMES["coun_dist"],
    meta: {
      inputWidth: "1rem",
    },
  },
  {
    accessorKey: "stsen_dist",
    header: DISPLAY_NAMES["stsen_dist"],
    meta: {
      inputWidth: "1rem",
    },
  },
  {
    accessorKey: "placeholder_active_vacate_orders",
    header: DISPLAY_NAMES["placeholder_active_vacate_orders"],
  },
  {
    accessorKey: "placeholder__dob_open_violations",
    header: DISPLAY_NAMES["placeholder__dob_open_violations"],
  },
  {
    accessorKey: "placeholder_failed_rodents",
    header: DISPLAY_NAMES["placeholder_failed_rodents"],
  },
  {
    accessorKey: "placeholder__outstanding_charges_water",
    header: DISPLAY_NAMES["placeholder__outstanding_charges_water"],
  },
  {
    accessorKey: "placeholder__bip_score",
    header: DISPLAY_NAMES["placeholder__bip_score"],
  },
  {
    accessorKey: "placeholder__rent_stab_units",
    header: DISPLAY_NAMES["placeholder__rent_stab_units"],
  },
  {
    accessorKey: "placeholder__hpd_emerg",
    header: DISPLAY_NAMES["placeholder__hpd_emerg"],
  },
  {
    accessorKey: "placeholder__active_hp",
    header: DISPLAY_NAMES["placeholder__active_hp"],
  },
  {
    accessorKey: "placeholder_elected_official_districts",
    header: DISPLAY_NAMES["placeholder_elected_official_districts"],
  },
  {
    accessorKey: "placeholder__total_evictions",
    header: DISPLAY_NAMES["placeholder__total_evictions"],
  },
];
