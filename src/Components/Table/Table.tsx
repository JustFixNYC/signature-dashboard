import {
  Column,
  ColumnDef,
  PaginationState,
  RowData,
  TableOptions,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import "./style.scss";
import DebouncedInput from "../DebouncedInput";
import { useState } from "react";
import { Icon } from "@justfixnyc/component-library";

interface TableProps<T extends object> {
  data: T[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<T, any>[];
  pagination?: boolean;
  initialSorting?: { id: string; desc: boolean }[];
}

declare module "@tanstack/react-table" {
  // allows us to define custom properties for our columns (copied from WoW)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: "text" | "range" | "boolean";
    inputWidth?: string;
  }
}

export const Table = <T extends object>(props: TableProps<T>) => {
  const { data, columns, initialSorting, pagination: hasPagination } = props;
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 50,
  });

  const options: TableOptions<T> = {
    data,
    columns,
    filterFns: {},
    initialState: {},
    state: {},
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client side filtering
    debugTable: false,
    debugHeaders: false,
    debugColumns: false,
  };

  if (initialSorting) {
    options.initialState = { sorting: initialSorting };
  }

  if (hasPagination) {
    options.getPaginationRowModel = getPaginationRowModel();
    options.onPaginationChange = setPagination;
    options.state = { pagination };
  }

  const table = useReactTable(options);

  return (
    <>
      <table className="collection-building-table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.column.id}
                    colSpan={header.colSpan}
                    style={{ minWidth: header.getSize() || undefined }}
                  >
                    {header.isPlaceholder ? null : (
                      <div className="column-header">
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? "column-header__label column-header__sort-area"
                              : "column-header__label",
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          <div className="column-header__label_sort">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {header.column.getCanSort() && (
                              <span className="column-header__sort-icons">
                                {header.column.getIsSorted() === "asc" && (
                                  <Icon
                                    icon="arrowUp"
                                    className="column-header__sort-icon"
                                  />
                                )}
                                {header.column.getIsSorted() === "desc" && (
                                  <Icon
                                    icon="arrowDown"
                                    className="column-header__sort-icon"
                                  />
                                )}
                              </span>
                            )}
                          </div>
                        </div>
                        {header.column.getCanFilter() ? (
                          <div className="column-header__filter">
                            <Filter column={header.column} />
                          </div>
                        ) : null}
                      </div>
                    )}
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
      {/* ------------------------------------------------------- */}
      {/* -------------- Pagination Footer ---------------------- */}
      {/* ------------------------------------------------------- */}
      {hasPagination && (
        <div className="pagination-container">
          <div className="pagination-controls">
            <button
              onClick={() => table.firstPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {"<<"}
            </button>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {"<"}
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {">"}
            </button>
            <button
              onClick={() => table.lastPage()}
              disabled={!table.getCanNextPage()}
            >
              {">>"}
            </button>
            <span className="pagination-controls__pages">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount().toLocaleString()}
            </span>
            <span>
              | Go to page:
              <input
                type="number"
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  table.setPageIndex(page);
                }}
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
          {/* <pre>{JSON.stringify(table.getState().pagination, null, 2)}</pre> */}
        </div>
      )}
    </>
  );
};

function Filter<T>({ column }: { column: Column<T, unknown> }) {
  const columnFilterValue = column.getFilterValue();
  const { filterVariant, inputWidth } = column.columnDef.meta ?? {};

  return filterVariant === "range" ? (
    <div>
      <div className="filter__input_range">
        <DebouncedInput
          type="number"
          value={(columnFilterValue as [number, number])?.[0] ?? ""}
          onChange={(value) => {
            column.setFilterValue((old: [number, number]) => [value, old?.[1]]);
          }}
          placeholder={`Min`}
        />
        <DebouncedInput
          type="number"
          value={(columnFilterValue as [number, number])?.[1] ?? ""}
          onChange={(value) => {
            column.setFilterValue((old: [number, number]) => [old?.[0], value]);
          }}
          placeholder={`Max`}
        />
      </div>
    </div>
  ) : filterVariant === "boolean" ? (
    <select
      onChange={(e) => {
        if (e.target.value === "true") {
          column.setFilterValue(true);
        } else {
          column.setFilterValue(false);
        }
      }}
      value={columnFilterValue?.toString()}
    >
      <option value="">All</option>
      <option value="true">True</option>
      <option value="false">False</option>
    </select>
  ) : (
    <DebouncedInput
      className="filter__input_text"
      onChange={(value) => {
        column.setFilterValue(value);
      }}
      type="text"
      value={(columnFilterValue ?? "") as string}
      {...(inputWidth && { style: { width: inputWidth } })}
    />
  );
}
