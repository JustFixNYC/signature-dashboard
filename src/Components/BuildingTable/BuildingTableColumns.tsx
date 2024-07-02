import { createColumnHelper } from "@tanstack/react-table";
import {
  formatMoney,
  formatNumber,
  formatPercent,
  getColumnHeader,
  round,
  showYesNo,
} from "../../util/helpers";
import { BuildingInfo } from "../../types/APIDataTypes";
import { Link } from "react-router-dom";

const columnHelper = createColumnHelper<BuildingInfo>();

export const columns = [
  columnHelper.accessor("address", {
    header: getColumnHeader("address"),
    cell: (info) => (
      <div className="cell__address">
        <Link to={`/buildings?bbl=${info.row.original.bbl}`}>
          {info.getValue()}
        </Link>
      </div>
    ),
    filterFn: "includesString",
  }),
  columnHelper.group({
    id: "location",
    header: () => "Location",
    columns: [
      columnHelper.accessor("zip", {
        header: getColumnHeader("zip"),
        filterFn: "includesString",
        meta: {
          inputWidth: "3rem",
        },
      }),
      columnHelper.accessor("borough", {
        header: getColumnHeader("borough"),
        filterFn: "includesString",
        meta: {
          inputWidth: "1.5rem",
          filterVariant: "select",
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
        cell: (info) => (
          <div className="cell__landlord">
            <Link to={`/landlords?landlord=${info.row.original.landlord_slug}`}>
              {info.getValue()}
            </Link>
          </div>
        ),
        filterFn: "includesString",
      }),
      columnHelper.accessor("lender", {
        header: getColumnHeader("lender"),
        filterFn: "includesString",
        meta: {
          inputWidth: "4rem",
          filterVariant: "select",
        },
      }),
      columnHelper.accessor("units_res", {
        header: getColumnHeader("units_res"),
        cell: (info) => formatNumber(info.getValue()),
        filterFn: "inNumberRange",
        meta: {
          filterVariant: "range",
        },
      }),
      columnHelper.accessor("rs_units", {
        header: getColumnHeader("rs_units"),
        cell: (info) => formatNumber(info.getValue()),
        filterFn: "inNumberRange",
        meta: {
          filterVariant: "range",
        },
      }),
      columnHelper.accessor("units_nonres", {
        header: getColumnHeader("units_nonres"),
        cell: (info) => showYesNo(info.getValue()),
        filterFn: "equals",
        meta: {
          filterVariant: "boolean",
        },
      }),
      columnHelper.accessor("year_built", {
        header: getColumnHeader("year_built"),
        filterFn: "inNumberRange",
        meta: {
          filterVariant: "range",
        },
      }),
    ],
  }),
  columnHelper.group({
    id: "bip",
    header: () => "Building Indicator Project (BIP)",
    columns: [
      columnHelper.accessor("bip", {
        header: getColumnHeader("bip"),
        cell: (info) => formatNumber(info.getValue()),
        filterFn: "inNumberRange",
        meta: {
          inputWidth: "2.5rem",
          filterVariant: "range",
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
        filterFn: "inNumberRange",
        meta: {
          filterVariant: "range",
        },
      }),
      columnHelper.accessor("hpd_viol_bc_open_per_unit", {
        header: getColumnHeader("hpd_viol_bc_open_per_unit"),
        cell: (info) => round(info.getValue()),
        filterFn: "inNumberRange",
        meta: {
          filterVariant: "range",
        },
      }),
      columnHelper.accessor("hpd_viol_bc_total", {
        header: getColumnHeader("hpd_viol_bc_total"),
        cell: (info) => info.getValue(),
        filterFn: "inNumberRange",
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
        filterFn: "inNumberRange",
        meta: {
          filterVariant: "range",
        },
      }),
      columnHelper.accessor("hpd_viol_pests", {
        header: getColumnHeader("hpd_viol_pests"),
        filterFn: "inNumberRange",
        meta: {
          filterVariant: "range",
        },
      }),
      columnHelper.accessor("hpd_viol_water", {
        header: getColumnHeader("hpd_viol_water"),
        filterFn: "inNumberRange",
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
        filterFn: "inNumberRange",
        meta: {
          filterVariant: "range",
        },
      }),
      columnHelper.accessor("hpd_erp_orders_per_unit", {
        header: getColumnHeader("hpd_erp_orders_per_unit"),
        cell: (info) => round(info.getValue()),
        filterFn: "inNumberRange",
        meta: {
          filterVariant: "range",
        },
      }),
    ],
  }),
  columnHelper.group({
    id: "hpd_complaints",
    header: () => "HPD Complaints",
    columns: [
      columnHelper.accessor("hpd_comp_emerg_total", {
        header: getColumnHeader("hpd_comp_emerg_total"),
        filterFn: "inNumberRange",
        meta: {
          filterVariant: "range",
        },
      }),
      columnHelper.accessor("hpd_comp_emerg_total_per_unit", {
        header: getColumnHeader("hpd_comp_emerg_total_per_unit"),
        cell: (info) => round(info.getValue()),
        filterFn: "inNumberRange",
        meta: {
          filterVariant: "range",
        },
      }),
      columnHelper.accessor("hpd_comp_heat", {
        header: getColumnHeader("hpd_comp_heat"),
        filterFn: "inNumberRange",
        meta: {
          filterVariant: "range",
        },
      }),
      columnHelper.accessor("hpd_comp_water", {
        header: getColumnHeader("hpd_comp_water"),
        filterFn: "inNumberRange",
        meta: {
          filterVariant: "range",
        },
      }),
      columnHelper.accessor("hpd_comp_pests", {
        header: getColumnHeader("hpd_comp_pests"),
        filterFn: "inNumberRange",
        meta: {
          filterVariant: "range",
        },
      }),
      columnHelper.accessor("hpd_comp_apts_pct", {
        header: getColumnHeader("hpd_comp_apts_pct"),
        cell: (info) => formatPercent(info.getValue()),
        filterFn: "inNumberRange",
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
        filterFn: "equals",
        meta: {
          filterVariant: "boolean",
        },
      }),
      columnHelper.accessor("in_conh", {
        header: getColumnHeader("in_conh"),
        cell: (info) => showYesNo(info.getValue()),
        filterFn: "equals",
        meta: {
          filterVariant: "boolean",
        },
      }),
      columnHelper.accessor("in_ucp", {
        header: getColumnHeader("in_ucp"),
        cell: (info) => showYesNo(info.getValue()),
        filterFn: "equals",
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
        filterFn: "includesString",
      }),
    ],
  }),

  columnHelper.group({
    id: "hp_cases",
    header: () => "HP Cases",
    columns: [
      columnHelper.accessor("hp_active", {
        header: getColumnHeader("hp_active"),
        filterFn: "inNumberRange",
        meta: {
          filterVariant: "range",
        },
      }),
      columnHelper.accessor("hp_find_harassment", {
        header: getColumnHeader("hp_find_harassment"),
        filterFn: "inNumberRange",
        meta: {
          filterVariant: "range",
        },
      }),
      columnHelper.accessor("hp_open_judgements", {
        header: getColumnHeader("hp_open_judgements"),
        filterFn: "inNumberRange",
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
        filterFn: "inNumberRange",
        meta: {
          filterVariant: "range",
        },
      }),
      columnHelper.accessor("evictions_executed", {
        header: getColumnHeader("evictions_executed"),
        filterFn: "inNumberRange",
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
      // columnHelper.accessor("placeholder_dob_permit_applications", {
      //   header: getColumnHeader("placeholder_dob_permit_applications"),
      // }),
      columnHelper.accessor("dob_jobs", {
        header: getColumnHeader("dob_jobs"),
        filterFn: "inNumberRange",
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
        filterFn: "inNumberRange",
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
        filterFn: "inNumberRange",
        meta: {
          filterVariant: "range",
        },
      }),
      columnHelper.accessor("hpd_erp_charges_per_unit", {
        header: getColumnHeader("hpd_erp_charges_per_unit"),
        cell: (info) => formatMoney(info.getValue()),
        filterFn: "inNumberRange",
        meta: {
          filterVariant: "range",
        },
      }),
      columnHelper.accessor("water_charges", {
        header: getColumnHeader("water_charges"),
        cell: (info) => formatMoney(info.getValue()),
        filterFn: "inNumberRange",
        meta: {
          filterVariant: "range",
        },
      }),
    ],
  }),
  columnHelper.group({
    id: "financial",
    header: () => "Financial",
    columns: [
      columnHelper.accessor("last_sale_date", {
        header: getColumnHeader("last_sale_date"),
        filterFn: "includesString",
      }),
      columnHelper.accessor("origination_date", {
        header: getColumnHeader("origination_date"),
        filterFn: "includesString",
      }),
      columnHelper.accessor("debt_total", {
        header: getColumnHeader("debt_total"),
        cell: (info) => formatMoney(info.getValue()),
        filterFn: "inNumberRange",
        meta: {
          filterVariant: "range",
        },
      }),
      columnHelper.accessor("debt_per_unit", {
        header: getColumnHeader("debt_per_unit"),
        cell: (info) => formatMoney(info.getValue()),
        filterFn: "inNumberRange",
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
        filterFn: "includesString",
        meta: {
          inputWidth: "1.5rem",
          filterVariant: "select",
        },
      }),
      columnHelper.accessor("assem_dist", {
        header: getColumnHeader("assem_dist"),
        filterFn: "includesString",
        meta: {
          inputWidth: "1.5rem",
          filterVariant: "select",
        },
      }),
      columnHelper.accessor("stsen_dist", {
        header: getColumnHeader("stsen_dist"),
        filterFn: "includesString",
        meta: {
          inputWidth: "1.5rem",
          filterVariant: "select",
        },
      }),
      columnHelper.accessor("cong_dist", {
        header: getColumnHeader("cong_dist"),
        filterFn: "includesString",
        meta: {
          inputWidth: "1.5rem",
          filterVariant: "select",
        },
      }),
    ],
  }),
];
