import { createColumnHelper } from "@tanstack/react-table";
import {
  INDICATOR_STRINGS,
  apiKeys,
  formatMoney,
  formatNumber,
  formatPercent,
} from "../../../util/helpers";
import { BuildingInfo } from "../../../types/APIDataTypes";
import { Link } from "react-router-dom";

const columnHelper = createColumnHelper<BuildingInfo>();

const getColumnHeader = (apiKey: apiKeys) => {
  const indicator = INDICATOR_STRINGS[apiKey];
  if (indicator) {
    return indicator.short_name ? indicator.short_name : indicator.name;
  } else {
    return apiKey;
  }
};

const round = (value: number) => {
  if (typeof value !== "number") {
    return value;
  }
  return value.toFixed(2);
};

const showYesNo = (value: boolean) => {
  if (value === true) {
    return "yes";
  } else if (value === false) {
    return "no";
  }
};

export const columns = [
  columnHelper.accessor("address", {
    header: getColumnHeader("address"),
    cell: (info) => (
      <Link to={`/building?bbl=${info.row.original.bbl}`}>
        {info.getValue()}
      </Link>
    ),
  }),
  columnHelper.group({
    id: "location",
    header: () => "Location",
    columns: [
      columnHelper.accessor("zip", {
        header: getColumnHeader("zip"),
        meta: {
          inputWidth: "3rem",
        },
      }),
      columnHelper.accessor("borough", {
        header: getColumnHeader("borough"),
        meta: {
          inputWidth: "1.5rem",
        },
      }),
    ],
  }),

  columnHelper.group({
    id: "building_info",
    header: () => "Building Info",
    columns: [
      columnHelper.accessor("landlord", {
        header: getColumnHeader("landlord"),
      }),
      columnHelper.accessor("lender", {
        header: getColumnHeader("lender"),
        meta: {
          inputWidth: "4rem",
        },
      }),
      columnHelper.accessor("units_nonres", {
        header: getColumnHeader("units_nonres"),
        cell: (info) => showYesNo(info.getValue()),
        meta: {
          filterVariant: "boolean",
        },
      }),
      columnHelper.accessor("rs_units", {
        header: getColumnHeader("rs_units"),
        cell: (info) => formatNumber(info.getValue()),
        meta: {
          filterVariant: "range",
        },
      }),
      columnHelper.accessor("year_built", {
        header: getColumnHeader("year_built"),
        meta: {
          filterVariant: "range",
        },
      }),
    ],
  }),
  columnHelper.group({
    id: "bip",
    header: () => "BIP Score",
    columns: [
      columnHelper.accessor("bip", {
        header: getColumnHeader("bip"),
        cell: (info) => formatNumber(info.getValue()),
        meta: {
          inputWidth: "2.5rem",
        },
      }),
    ],
  }),
  columnHelper.group({
    id: "hpd_violations",
    header: () => "HPD Violations",
    columns: [
      columnHelper.accessor("hpd_viol_bc_open", {
        header: getColumnHeader("hpd_viol_bc_open"),
        cell: (info) => formatNumber(info.getValue()),
        meta: {
          filterVariant: "range",
        },
      }),
      columnHelper.accessor("hpd_viol_bc_open_per_unit", {
        header: getColumnHeader("hpd_viol_bc_open_per_unit"),
        cell: (info) => round(info.getValue()),
        meta: {
          filterVariant: "range",
        },
      }),
      columnHelper.accessor("hpd_viol_bc_total", {
        header: getColumnHeader("hpd_viol_bc_total"),
        cell: (info) => info.getValue(),
        meta: {
          filterVariant: "range",
        },
      }),
      // columnHelper.accessor("hpd_viol_bc_total_per_unit", {
      //   header: getColumnHeader("hpd_viol_bc_total_per_unit"),
      //   cell: (info) => round(info.getValue()),
      //   meta: {
      //     filterVariant: "range",
      //   },
      // }),
      columnHelper.accessor("hpd_viol_heat", {
        header: getColumnHeader("hpd_viol_heat"),
        meta: {
          filterVariant: "range",
        },
      }),
      columnHelper.accessor("hpd_viol_pests", {
        header: getColumnHeader("hpd_viol_pests"),
        meta: {
          filterVariant: "range",
        },
      }),
      columnHelper.accessor("hpd_viol_water", {
        header: getColumnHeader("hpd_viol_water"),
        meta: {
          filterVariant: "range",
        },
      }),
    ],
  }),
  columnHelper.group({
    id: "hpd_emerg_repairs",
    header: () => "HPD Emergency Repairs",
    columns: [
      columnHelper.accessor("hpd_erp_orders", {
        header: getColumnHeader("hpd_erp_orders"),
        cell: (info) => formatNumber(info.getValue()),
        meta: {
          filterVariant: "range",
        },
      }),
      // columnHelper.accessor("hpd_erp_orders_per_unit", {
      //   header: getColumnHeader("hpd_erp_orders_per_unit"),
      // }),
    ],
  }),
  columnHelper.group({
    id: "hpd_complaints",
    header: () => "HPD Complaints",
    columns: [
      columnHelper.accessor("hpd_comp_emerg_total", {
        header: getColumnHeader("hpd_comp_emerg_total"),
        meta: {
          filterVariant: "range",
        },
      }),
      columnHelper.accessor("hpd_comp_emerg_total_per_unit", {
        header: getColumnHeader("hpd_comp_emerg_total_per_unit"),
        meta: {
          // filterVariant: "range",
        },
      }),
      columnHelper.accessor("hpd_comp_heat", {
        header: getColumnHeader("hpd_comp_heat"),
        meta: {
          filterVariant: "range",
        },
      }),
      columnHelper.accessor("hpd_comp_water", {
        header: getColumnHeader("hpd_comp_water"),
        meta: {
          filterVariant: "range",
        },
      }),
      columnHelper.accessor("hpd_comp_pests", {
        header: getColumnHeader("hpd_comp_pests"),
        meta: {
          filterVariant: "range",
        },
      }),
      columnHelper.accessor("hpd_comp_apts_pct", {
        header: getColumnHeader("hpd_comp_apts_pct"),
        cell: (info) => formatPercent(info.getValue()),
        meta: {
          filterVariant: "range",
        },
      }),
    ],
  }),
  columnHelper.group({
    id: "hpd_programs",
    header: () => "HPD Programs",
    columns: [
      columnHelper.accessor("in_aep", {
        header: getColumnHeader("in_aep"),
        cell: (info) => showYesNo(info.getValue()),
        meta: {
          filterVariant: "boolean",
        },
      }),
      columnHelper.accessor("in_conh", {
        header: getColumnHeader("in_conh"),
        cell: (info) => showYesNo(info.getValue()),
        meta: {
          filterVariant: "boolean",
        },
      }),
      columnHelper.accessor("in_ucp", {
        header: getColumnHeader("in_ucp"),
        cell: (info) => showYesNo(info.getValue()),
        meta: {
          filterVariant: "boolean",
        },
      }),
    ],
  }),
  columnHelper.group({
    id: "vacate_orders",
    header: () => "Vacate Orders",
    columns: [
      columnHelper.accessor("placeholder_vacate_order", {
        header: getColumnHeader("placeholder_vacate_order"),
      }),
    ],
  }),

  columnHelper.group({
    id: "hp_cases",
    header: () => "HP Cases",
    columns: [
      columnHelper.accessor("hp_active", {
        header: getColumnHeader("hp_active"),
        meta: {
          filterVariant: "range",
        },
      }),
      columnHelper.accessor("hp_find_harassment", {
        header: getColumnHeader("hp_find_harassment"),
        meta: {
          filterVariant: "range",
        },
      }),
      columnHelper.accessor("hp_open_judgements", {
        header: getColumnHeader("hp_open_judgements"),
        meta: {
          filterVariant: "range",
        },
      }),
    ],
  }),
  columnHelper.group({
    id: "evictions",
    header: () => "Evictions",
    columns: [
      columnHelper.accessor("evictions_filed", {
        header: getColumnHeader("evictions_filed"),
        meta: {
          filterVariant: "range",
        },
      }),
      columnHelper.accessor("evictions_executed", {
        header: getColumnHeader("evictions_executed"),
        meta: {
          filterVariant: "range",
        },
      }),
    ],
  }),
  columnHelper.group({
    id: "dob_permits",
    header: () => "DOB Permits",
    columns: [
      columnHelper.accessor("placeholder_dob_permit_applications", {
        header: getColumnHeader("placeholder_dob_permit_applications"),
      }),
      columnHelper.accessor("dob_jobs", {
        header: getColumnHeader("dob_jobs"),
        meta: {
          filterVariant: "range",
        },
      }),
    ],
  }),
  columnHelper.group({
    id: "dob_violations",
    header: () => "DOB Violations",
    columns: [
      columnHelper.accessor("dob_ecb_viol_total", {
        header: getColumnHeader("dob_ecb_viol_total"),
        meta: {
          filterVariant: "range",
        },
      }),
    ],
  }),
  columnHelper.group({
    id: "fines_fees_charges",
    header: () => "Fines, Fees & Charges",
    columns: [
      columnHelper.accessor("hpd_erp_charges", {
        header: getColumnHeader("hpd_erp_charges"),
        cell: (info) => formatMoney(info.getValue()),
        meta: {
          filterVariant: "range",
        },
      }),
      columnHelper.accessor("hpd_erp_charges_per_unit", {
        header: getColumnHeader("hpd_erp_charges_per_unit"),
        cell: (info) => formatMoney(info.getValue()),
        meta: {
          filterVariant: "range",
        },
      }),
      columnHelper.accessor("placeholder_outstanding_water", {
        header: getColumnHeader("placeholder_outstanding_water"),
      }),
    ],
  }),
  columnHelper.group({
    id: "financial",
    header: () => "Financial",
    columns: [
      columnHelper.accessor("last_sale_date", {
        header: getColumnHeader("last_sale_date"),
      }),
      columnHelper.accessor("origination_date", {
        header: getColumnHeader("origination_date"),
      }),
      columnHelper.accessor("debt_total", {
        header: getColumnHeader("debt_total"),
        cell: (info) => formatMoney(info.getValue()),
        meta: {
          filterVariant: "range",
        },
      }),
      columnHelper.accessor("debt_per_unit", {
        header: getColumnHeader("debt_per_unit"),
        cell: (info) => formatMoney(info.getValue()),
        meta: {
          filterVariant: "range",
        },
      }),
    ],
  }),
  columnHelper.group({
    id: "political_districts",
    header: () => "Political Districts",
    columns: [
      columnHelper.accessor("coun_dist", {
        header: getColumnHeader("coun_dist"),
        meta: {
          inputWidth: "1.5rem",
        },
      }),
      columnHelper.accessor("assem_dist", {
        header: getColumnHeader("assem_dist"),
        meta: {
          inputWidth: "1.5rem",
        },
      }),
      columnHelper.accessor("stsen_dist", {
        header: getColumnHeader("stsen_dist"),
        meta: {
          inputWidth: "1.5rem",
        },
      }),
      columnHelper.accessor("cong_dist", {
        header: getColumnHeader("cong_dist"),
        meta: {
          inputWidth: "1.5rem",
        },
      }),
    ],
  }),
];
