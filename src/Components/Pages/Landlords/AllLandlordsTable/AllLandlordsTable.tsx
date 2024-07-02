import { createColumnHelper } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { LandlordInfo } from "../../../../types/APIDataTypes";
import {
  getColumnHeader,
  round,
  formatMoney,
  formatNumber,
} from "../../../../util/helpers";
import { useGetAllLandlords } from "../../../../api/hooks";
import { Table } from "../../../Table/Table";
import "./style.scss";

const columnHelper = createColumnHelper<LandlordInfo>();

export const columns = [
  columnHelper.accessor("landlord_name", {
    id: "landlord_name",
    header: getColumnHeader("landlord_name"),
    cell: (info) => (
      <div className="cell__landlord-name">
        <Link to={`/landlords?landlord=${info.row.original.landlord_slug}`}>
          {info.getValue()}
        </Link>
      </div>
    ),
    filterFn: "includesString",
  }),
  columnHelper.accessor("lender_name", {
    header: getColumnHeader("lender_name"),
    cell: (info) => info.getValue(),
    filterFn: "includesString",
    meta: {
      filterVariant: "select",
    },
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

export const AllLandlordsTable: React.FC = () => {
  const { data, error, isLoading } = useGetAllLandlords();

  return (
    <>
      {isLoading && <div>loading...</div>}
      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
      {data && (
        <>
          <p>
            {data.length} landlords with rent-regulated properties financed by
            Signature Bank. Each one will have their portfolios entirely in
            either the CPC or Santander joint ventures.
          </p>
          <Table
            data={data}
            columns={columns}
            pagination
            initialState={{ sorting: [{ id: "units_res", desc: true }] }}
          />
        </>
      )}
    </>
  );
};
