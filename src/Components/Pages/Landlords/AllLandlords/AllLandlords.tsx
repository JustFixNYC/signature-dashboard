import { createColumnHelper } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { LandlordInfo } from "../../../../types/APIDataTypes";
import { getColumnHeader, round, formatMoney, formatNumber } from "../../../../util/helpers";
import { useGetAllLandlords } from "../../../../api/hooks";
import { Table } from "../../../Table/Table";

const columnHelper = createColumnHelper<LandlordInfo>();

export const columns = [
  columnHelper.accessor("landlord_name", {
    header: getColumnHeader("landlord_name"),
    cell: (info) => (
      <Link to={`/landlords?landlord=${info.row.original.landlord_slug}`}>
        {info.getValue()}
      </Link>
    ),
  }),
  columnHelper.accessor("lender_name", {
    header: getColumnHeader("lender_name"),
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("buildings", {
    header: getColumnHeader("buildings"),
    cell: (info) => info.getValue(),
    filterFn: "inNumberRange",
    meta: {
      filterVariant: "range",
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
  columnHelper.accessor("hpd_viol_bc_open_per_unit", {
    header: getColumnHeader("hpd_viol_bc_open_per_unit"),
    cell: (info) => round(info.getValue()),
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
];

export const AllLandlords: React.FC = () => {
  const { data, error, isLoading } = useGetAllLandlords();

  return (
    <>
      <h2>Landlords</h2>
      {isLoading && <div>loading...</div>}
      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
      {data && (
        <Table
          data={data}
          columns={columns}
          pagination
          initialSorting={[{ id: "units_res", desc: true }]}
        />
      )}
    </>
  );
};
