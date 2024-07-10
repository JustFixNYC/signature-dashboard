import { createColumnHelper } from "@tanstack/react-table";
import {
  formatMoney,
  formatNumber,
  formatPercent,
  getColumnAccessor,
  getColumnHeader,
  round,
  showYesNo,
} from "../../util/helpers";
import { BuildingInfo } from "../../types/APIDataTypes";
import { Link } from "react-router-dom";

const columnHelper = createColumnHelper<BuildingInfo>();

export const columns = [
  columnHelper.accessor((row) => getColumnAccessor(row.address), {
    id: "address",
    header: getColumnHeader("address"),
    cell: (info) => (
      <div className="cell__address">
        <Link to={`/buildings?bbl=${info.row.original.bbl}`}>
          {info.getValue()}
        </Link>
      </div>
    ),
    sortUndefined: "last",
    filterFn: "includesString",
  }),
  columnHelper.group({
    id: "location",
    header: () => "Location",
    columns: [
      columnHelper.accessor((row) => getColumnAccessor(row.zip), {
        id: "zip",
        header: getColumnHeader("zip"),
        sortUndefined: "last",
        filterFn: "includesString",
        meta: {
          inputWidth: "3rem",
        },
      }),
      columnHelper.accessor((row) => getColumnAccessor(row.borough), {
        id: "borough",
        header: getColumnHeader("borough"),
        sortUndefined: "last",
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
      columnHelper.accessor((row) => getColumnAccessor(row.landlord), {
        id: "landlord",
        header: getColumnHeader("landlord"),
        cell: (info) => (
          <div className="cell__landlord">
            <Link to={`/landlords?landlord=${info.row.original.landlord_slug}`}>
              {info.getValue()}
            </Link>
          </div>
        ),
        sortUndefined: "last",
        filterFn: "includesString",
      }),
      columnHelper.accessor((row) => getColumnAccessor(row.lender), {
        id: "lender",
        header: getColumnHeader("lender"),
        sortUndefined: "last",
        filterFn: "includesString",
        meta: {
          inputWidth: "4rem",
          filterVariant: "select",
        },
      }),
      columnHelper.accessor((row) => getColumnAccessor(row.units_res), {
        id: "units_res",
        header: getColumnHeader("units_res"),
        cell: (info) => formatNumber(info.getValue()),
        sortUndefined: "last",
        filterFn: "inNumberRange",
        meta: {
          filterVariant: "range",
        },
      }),
      columnHelper.accessor((row) => getColumnAccessor(row.rs_units), {
        id: "rs_units",
        header: getColumnHeader("rs_units"),
        cell: (info) => formatNumber(info.getValue()),
        sortUndefined: "last",
        filterFn: "inNumberRange",
        meta: {
          filterVariant: "range",
        },
      }),
      columnHelper.accessor((row) => getColumnAccessor(row.units_nonres), {
        id: "units_nonres",
        header: getColumnHeader("units_nonres"),
        cell: (info) => showYesNo(info.getValue()),
        sortUndefined: "last",
        filterFn: "equals",
        meta: {
          filterVariant: "boolean",
        },
      }),
      columnHelper.accessor((row) => getColumnAccessor(row.year_built), {
        id: "year_built",
        header: getColumnHeader("year_built"),
        sortUndefined: "last",
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
      columnHelper.accessor((row) => getColumnAccessor(row.bip), {
        id: "bip",
        header: getColumnHeader("bip"),
        cell: (info) => formatNumber(info.getValue()),
        sortUndefined: "last",
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
      columnHelper.accessor((row) => getColumnAccessor(row.hpd_viol_bc_open), {
        id: "hpd_viol_bc_open",
        header: getColumnHeader("hpd_viol_bc_open"),
        cell: (info) => formatNumber(info.getValue()),
        sortUndefined: "last",
        filterFn: "inNumberRange",
        meta: {
          filterVariant: "range",
        },
      }),
      columnHelper.accessor(
        (row) => getColumnAccessor(row.hpd_viol_bc_open_per_unit),
        {
          id: "hpd_viol_bc_open_per_unit",
          header: getColumnHeader("hpd_viol_bc_open_per_unit"),
          cell: (info) => round(info.getValue()),
          sortUndefined: "last",
          filterFn: "inNumberRange",
          meta: {
            filterVariant: "range",
          },
        }
      ),
      columnHelper.accessor((row) => getColumnAccessor(row.hpd_viol_bc_total), {
        id: "hpd_viol_bc_total",
        header: getColumnHeader("hpd_viol_bc_total"),
        cell: (info) => info.getValue(),
        sortUndefined: "last",
        filterFn: "inNumberRange",
        meta: {
          filterVariant: "range",
        },
      }),
      columnHelper.accessor((row) => getColumnAccessor(row.hpd_viol_heat), {
        id: "hpd_viol_heat",
        header: getColumnHeader("hpd_viol_heat"),
        sortUndefined: "last",
        filterFn: "inNumberRange",
        meta: {
          filterVariant: "range",
        },
      }),
      columnHelper.accessor((row) => getColumnAccessor(row.hpd_viol_pests), {
        id: "hpd_viol_pests",
        header: getColumnHeader("hpd_viol_pests"),
        sortUndefined: "last",
        filterFn: "inNumberRange",
        meta: {
          filterVariant: "range",
        },
      }),
      columnHelper.accessor((row) => getColumnAccessor(row.hpd_viol_water), {
        id: "hpd_viol_water",
        header: getColumnHeader("hpd_viol_water"),
        sortUndefined: "last",
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
      columnHelper.accessor((row) => getColumnAccessor(row.hpd_erp_orders), {
        id: "hpd_erp_orders",
        header: getColumnHeader("hpd_erp_orders"),
        cell: (info) => formatNumber(info.getValue()),
        sortUndefined: "last",
        filterFn: "inNumberRange",
        meta: {
          filterVariant: "range",
        },
      }),
      columnHelper.accessor(
        (row) => getColumnAccessor(row.hpd_erp_orders_per_unit),
        {
          id: "hpd_erp_orders_per_unit",
          header: getColumnHeader("hpd_erp_orders_per_unit"),
          cell: (info) => round(info.getValue()),
          sortUndefined: "last",
          filterFn: "inNumberRange",
          meta: {
            filterVariant: "range",
          },
        }
      ),
    ],
  }),
  columnHelper.group({
    id: "hpd_complaints",
    header: () => "HPD Complaints",
    columns: [
      columnHelper.accessor(
        (row) => getColumnAccessor(row.hpd_comp_emerg_total),
        {
          id: "hpd_comp_emerg_total",
          header: getColumnHeader("hpd_comp_emerg_total"),
          sortUndefined: "last",
          filterFn: "inNumberRange",
          meta: {
            filterVariant: "range",
          },
        }
      ),
      columnHelper.accessor(
        (row) => getColumnAccessor(row.hpd_comp_emerg_total_per_unit),
        {
          id: "hpd_comp_emerg_total_per_unit",
          header: getColumnHeader("hpd_comp_emerg_total_per_unit"),
          cell: (info) => round(info.getValue()),
          sortUndefined: "last",
          filterFn: "inNumberRange",
          meta: {
            filterVariant: "range",
          },
        }
      ),
      columnHelper.accessor((row) => getColumnAccessor(row.hpd_comp_heat), {
        id: "hpd_comp_heat",
        header: getColumnHeader("hpd_comp_heat"),
        sortUndefined: "last",
        filterFn: "inNumberRange",
        meta: {
          filterVariant: "range",
        },
      }),
      columnHelper.accessor((row) => getColumnAccessor(row.hpd_comp_water), {
        id: "hpd_comp_water",
        header: getColumnHeader("hpd_comp_water"),
        sortUndefined: "last",
        filterFn: "inNumberRange",
        meta: {
          filterVariant: "range",
        },
      }),
      columnHelper.accessor((row) => getColumnAccessor(row.hpd_comp_pests), {
        id: "hpd_comp_pests",
        header: getColumnHeader("hpd_comp_pests"),
        sortUndefined: "last",
        filterFn: "inNumberRange",
        meta: {
          filterVariant: "range",
        },
      }),
      columnHelper.accessor((row) => getColumnAccessor(row.hpd_comp_apts_pct), {
        id: "hpd_comp_apts_pct",
        header: getColumnHeader("hpd_comp_apts_pct"),
        cell: (info) => formatPercent(info.getValue()),
        sortUndefined: "last",
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
      columnHelper.accessor((row) => getColumnAccessor(row.in_aep), {
        id: "in_aep",
        header: getColumnHeader("in_aep"),
        cell: (info) => showYesNo(info.getValue()),
        sortUndefined: "last",
        filterFn: "equals",
        meta: {
          filterVariant: "boolean",
        },
      }),
      columnHelper.accessor((row) => getColumnAccessor(row.in_conh), {
        id: "in_conh",
        header: getColumnHeader("in_conh"),
        cell: (info) => showYesNo(info.getValue()),
        sortUndefined: "last",
        filterFn: "equals",
        meta: {
          filterVariant: "boolean",
        },
      }),
      columnHelper.accessor((row) => getColumnAccessor(row.in_ucp), {
        id: "in_ucp",
        header: getColumnHeader("in_ucp"),
        cell: (info) => showYesNo(info.getValue()),
        sortUndefined: "last",
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
      columnHelper.accessor(
        (row) => getColumnAccessor(row.placeholder_vacate_order),
        {
          id: "placeholder_vacate_order",
          header: getColumnHeader("placeholder_vacate_order"),
          sortUndefined: "last",
          filterFn: "includesString",
        }
      ),
    ],
  }),

  columnHelper.group({
    id: "hp_cases",
    header: () => "HP Cases",
    columns: [
      columnHelper.accessor((row) => getColumnAccessor(row.hp_active), {
        id: "hp_active",
        header: getColumnHeader("hp_active"),
        sortUndefined: "last",
        filterFn: "inNumberRange",
        meta: {
          filterVariant: "range",
        },
      }),
      columnHelper.accessor(
        (row) => getColumnAccessor(row.hp_find_harassment),
        {
          id: "hp_find_harassment",
          header: getColumnHeader("hp_find_harassment"),
          sortUndefined: "last",
          filterFn: "inNumberRange",
          meta: {
            filterVariant: "range",
          },
        }
      ),
      columnHelper.accessor(
        (row) => getColumnAccessor(row.hp_open_judgements),
        {
          id: "hp_open_judgements",
          header: getColumnHeader("hp_open_judgements"),
          sortUndefined: "last",
          filterFn: "inNumberRange",
          meta: {
            filterVariant: "range",
          },
        }
      ),
    ],
  }),
  columnHelper.group({
    id: "evictions",
    header: () => "Evictions",
    columns: [
      columnHelper.accessor((row) => getColumnAccessor(row.evictions_filed), {
        id: "evictions_filed",
        header: getColumnHeader("evictions_filed"),
        sortUndefined: "last",
        filterFn: "inNumberRange",
        meta: {
          filterVariant: "range",
        },
      }),
      columnHelper.accessor(
        (row) => getColumnAccessor(row.evictions_executed),
        {
          id: "evictions_executed",
          header: getColumnHeader("evictions_executed"),
          sortUndefined: "last",
          filterFn: "inNumberRange",
          meta: {
            filterVariant: "range",
          },
        }
      ),
    ],
  }),
  columnHelper.group({
    id: "dob_permits",
    header: () => "DOB Permits",
    columns: [
      columnHelper.accessor((row) => getColumnAccessor(row.dob_jobs), {
        id: "dob_jobs",
        header: getColumnHeader("dob_jobs"),
        sortUndefined: "last",
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
      columnHelper.accessor(
        (row) => getColumnAccessor(row.dob_ecb_viol_total),
        {
          id: "dob_ecb_viol_total",
          header: getColumnHeader("dob_ecb_viol_total"),
          sortUndefined: "last",
          filterFn: "inNumberRange",
          meta: {
            filterVariant: "range",
          },
        }
      ),
    ],
  }),
  columnHelper.group({
    id: "fines_fees_charges",
    header: () => "Fines, Fees & Charges",
    columns: [
      columnHelper.accessor((row) => getColumnAccessor(row.hpd_erp_charges), {
        id: "hpd_erp_charges",
        header: getColumnHeader("hpd_erp_charges"),
        cell: (info) => formatMoney(info.getValue()),
        sortUndefined: "last",
        filterFn: "inNumberRange",
        meta: {
          filterVariant: "range",
        },
      }),
      columnHelper.accessor(
        (row) => getColumnAccessor(row.hpd_erp_charges_per_unit),
        {
          id: "hpd_erp_charges_per_unit",
          header: getColumnHeader("hpd_erp_charges_per_unit"),
          cell: (info) => formatMoney(info.getValue()),
          sortUndefined: "last",
          filterFn: "inNumberRange",
          meta: {
            filterVariant: "range",
          },
        }
      ),
      columnHelper.accessor((row) => getColumnAccessor(row.water_charges), {
        id: "water_charges",
        header: getColumnHeader("water_charges"),
        cell: (info) => formatMoney(info.getValue()),
        sortUndefined: "last",
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
      columnHelper.accessor((row) => getColumnAccessor(row.last_sale_date), {
        id: "last_sale_date",
        header: getColumnHeader("last_sale_date"),
        sortUndefined: "last",
        filterFn: "includesString",
      }),
      columnHelper.accessor((row) => getColumnAccessor(row.origination_date), {
        id: "origination_date",
        header: getColumnHeader("origination_date"),
        sortUndefined: "last",
        filterFn: "includesString",
      }),
      columnHelper.accessor((row) => getColumnAccessor(row.debt_total), {
        id: "debt_total",
        header: getColumnHeader("debt_total"),
        cell: (info) => formatMoney(info.getValue()),
        sortUndefined: "last",
        filterFn: "inNumberRange",
        meta: {
          filterVariant: "range",
        },
      }),
      columnHelper.accessor((row) => getColumnAccessor(row.debt_per_unit), {
        id: "debt_per_unit",
        header: getColumnHeader("debt_per_unit"),
        cell: (info) => formatMoney(info.getValue()),
        sortUndefined: "last",
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
      columnHelper.accessor((row) => getColumnAccessor(row.coun_dist), {
        id: "coun_dist",
        header: getColumnHeader("coun_dist"),
        sortUndefined: "last",
        filterFn: "includesString",
        meta: {
          inputWidth: "1.5rem",
          filterVariant: "select",
        },
      }),
      columnHelper.accessor((row) => getColumnAccessor(row.assem_dist), {
        id: "assem_dist",
        header: getColumnHeader("assem_dist"),
        sortUndefined: "last",
        filterFn: "includesString",
        meta: {
          inputWidth: "1.5rem",
          filterVariant: "select",
        },
      }),
      columnHelper.accessor((row) => getColumnAccessor(row.stsen_dist), {
        id: "stsen_dist",
        header: getColumnHeader("stsen_dist"),
        sortUndefined: "last",
        filterFn: "includesString",
        meta: {
          inputWidth: "1.5rem",
          filterVariant: "select",
        },
      }),
      columnHelper.accessor((row) => getColumnAccessor(row.cong_dist), {
        id: "cong_dist",
        header: getColumnHeader("cong_dist"),
        sortUndefined: "last",
        filterFn: "includesString",
        meta: {
          inputWidth: "1.5rem",
          filterVariant: "select",
        },
      }),
    ],
  }),
];
