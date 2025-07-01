import { createColumnHelper } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { LandlordInfo } from "../../../../types/APIDataTypes";
import {
  getColumnHeader,
  round,
  formatMoney,
  formatNumber,
  getColumnAccessor,
} from "../../../../util/helpers";
import { Table } from "../../../Table/Table";
import "./style.scss";

const columnHelper = createColumnHelper<LandlordInfo>();

export const columns = [
  columnHelper.accessor((row) => getColumnAccessor(row.landlord_name), {
    id: "landlord_name",
    header: getColumnHeader("landlord_name"),
    sortUndefined: "last",
    cell: (info) => (
      <div className="cell__landlord-name">
        <Link to={`/landlords?landlord=${info.row.original.landlord_slug}`}>
          {info.getValue()}
        </Link>
      </div>
    ),
    filterFn: "includesString",
  }),
  columnHelper.accessor((row) => getColumnAccessor(row.loan_pool_name), {
    id: "loan_pool_name",
    header: getColumnHeader("loan_pool_name"),
    sortUndefined: "last",
    cell: (info) => info.getValue(),
    filterFn: "includesString",
    meta: {
      filterVariant: "select",
    },
  }),
  columnHelper.accessor((row) => getColumnAccessor(row.buildings_agg), {
    id: "buildings_agg",
    header: getColumnHeader("buildings_agg"),
    sortUndefined: "last",
    cell: (info) => info.getValue(),
    filterFn: "inNumberRange",
    meta: {
      filterVariant: "range",
    },
  }),
  columnHelper.accessor((row) => getColumnAccessor(row.units_res_agg), {
    id: "units_res_agg",
    header: getColumnHeader("units_res_agg"),
    sortUndefined: "last",
    cell: (info) => formatNumber(info.getValue()),
    filterFn: "inNumberRange",
    meta: {
      filterVariant: "range",
    },
  }),
  columnHelper.accessor(
    (row) => getColumnAccessor(row.hpd_viol_bc_open_per_unit_agg),
    {
      id: "hpd_viol_bc_open_per_unit_agg",
      header: getColumnHeader("hpd_viol_bc_open_per_unit_agg"),
      sortUndefined: "last",
      cell: (info) => round(info.getValue()),
      filterFn: "inNumberRange",
      meta: {
        filterVariant: "range",
      },
    },
  ),
  columnHelper.accessor((row) => getColumnAccessor(row.debt_per_unit_agg), {
    id: "debt_per_unit_agg",
    header: getColumnHeader("debt_per_unit_agg"),
    sortUndefined: "last",
    cell: (info) => formatMoney(info.getValue()),
    filterFn: "inNumberRange",
    meta: {
      filterVariant: "range",
    },
  }),
];

export const AllLandlordsTable: React.FC<{
  data: LandlordInfo[];
}> = ({ data }) => {
  return (
    <Table
      data={data}
      columns={columns}
      pagination
      initialSorting={[{ id: "units_res_agg", desc: true }]}
      qsPrefix="ll" // NOTE: changing this value will break bookmarked urls
      className="landlords-table"
    />
  );
};
