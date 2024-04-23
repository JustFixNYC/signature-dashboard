import { AddressRecord } from "../../types/APIDataTypes";
import {
  PaginationState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import "./style.css";
import React from "react";

const columnHelper = createColumnHelper<AddressRecord>();

const columns = [
  columnHelper.accessor((row) => `${row.housenumber} ${row.streetname}`, {
    id: "address",
    header: () => <span>Address</span>,
  }),
  columnHelper.group({
    id: "location",
    header: () => "Location",
    columns: [
      columnHelper.accessor("zip", {
        header: () => "ZipCode",
        cell: (info) => {
          return info.renderValue();
        },
      }),
      columnHelper.accessor("boro", {
        header: () => <span>Borough</span>,
      }),
      columnHelper.accessor("bbl", {
        header: "BBL",
      }),
      columnHelper.accessor("council", {
        header: "Council District",
      }),
    ],
  }),
  columnHelper.accessor("yearbuilt", {
    header: "Built",
  }),
  columnHelper.accessor("unitsres", {
    header: "Units",
  }),
  columnHelper.accessor("rsunits2007", {
    header: "2007",
  }),
  columnHelper.accessor("rsunitslatest", {
    header: "rsunitslatest",
  }),
];

export const TanstackTable: React.FC = () => {
  const [data, setData] = React.useState<AddressRecord[]>([]);
  const [isFetching, setIsFetching] = React.useState<boolean>(false);
  const [fetched, setFetched] = React.useState<boolean>(false);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });

  if (!fetched && !isFetching) {
    setIsFetching(true);
    fetch("data/sample_data.json")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data.data);
        setFetched(true);
        setIsFetching(false);
      });
  }

  return (
    <>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {header.depth === 2 &&
                      ({
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted() as string] ??
                        null)}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <div className="flex items-center gap-2">
          <button
            className="border rounded p-1"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </button>
          <button
            className="border rounded p-1"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </button>
          <span className="flex items-center gap-1">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount().toLocaleString()}
            </strong>
          </span>
          <span className="flex items-center gap-1">
            | Go to page:
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="border p-1 rounded w-16"
            />
          </span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div>
          Showing {table.getRowModel().rows.length.toLocaleString()} of{" "}
          {table.getRowCount().toLocaleString()} Rows
        </div>
        <pre>{JSON.stringify(table.getState().pagination, null, 2)}</pre>
      </div>
    </>
  );
};
