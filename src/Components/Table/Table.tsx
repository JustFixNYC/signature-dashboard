import {
  Column,
  ColumnDef,
  InitialTableState,
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
import { CSSProperties, useRef, useState } from "react";
import { Icon } from "@justfixnyc/component-library";

const pageSizeOptions = [10, 20, 30, 40, 50, 100] as const;
type PageSizeOptions = (typeof pageSizeOptions)[number];

interface TableProps<T extends object> {
  data: T[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<T, any>[];
  pagination?: boolean;
  pageSize?: PageSizeOptions;
  initialState?: InitialTableState;
}

declare module "@tanstack/react-table" {
  // allows us to define custom properties for our columns (copied from WoW)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: "text" | "range" | "boolean";
    inputWidth?: string;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getCommonPinningStyles = (column: Column<any>): CSSProperties => {
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn =
    isPinned === "left" && column.getIsLastColumn("left");
  const isFirstRightPinnedColumn =
    isPinned === "right" && column.getIsFirstColumn("right");

  return {
    boxShadow: isLastLeftPinnedColumn
      ? "-4px 0 4px -4px gray inset"
      : isFirstRightPinnedColumn
        ? "4px 0 4px -4px gray inset"
        : undefined,
    left:
      isPinned === "left" ? `${column.getStart("left") + 127}px` : undefined, // The 127px is due to the sidebar.
    right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
    backgroundColor: isPinned ? "white" : "initial",
    position: isPinned ? "sticky" : "relative",
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
  };
};

export const Table = <T extends object>(props: TableProps<T>) => {
  const {
    data,
    columns,
    initialState,
    pagination: hasPagination,
    pageSize = 50,
  } = props;
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: pageSize,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  const options: TableOptions<T> = {
    data,
    columns,
    filterFns: {},
    initialState: { ...initialState },
    state: {},
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client side filtering
    debugTable: false,
    debugHeaders: false,
    debugColumns: false,
  };

  if (hasPagination) {
    options.getPaginationRowModel = getPaginationRowModel();
    options.onPaginationChange = setPagination;
    options.state = { pagination };
  }

  const table = useReactTable(options);

  return (
    <div className="table-container" ref={containerRef}>
      <table className="collection-building-table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.column.id}
                    colSpan={header.colSpan}
                    style={{
                      minWidth: header.getSize() || undefined,
                      ...getCommonPinningStyles(header.column),
                    }}
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
                              header.getContext(),
                            )}
                            {header.column.getCanSort() && (
                              <span className="column-header__sort-icons">
                                {header.column.getIsSorted() === "asc" ? (
                                  <Icon
                                    icon="arrowUp"
                                    className="column-header__sort-icon"
                                  />
                                ) : header.column.getIsSorted() === "desc" ? (
                                  <Icon
                                    icon="arrowDown"
                                    className="column-header__sort-icon"
                                  />
                                ) : (
                                  <>
                                    <Icon
                                      icon="arrowUp"
                                      className="column-header__sort-icon"
                                    />
                                    <Icon
                                      icon="arrowDown"
                                      className="column-header__sort-icon"
                                    />
                                  </>
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
                <td
                  key={cell.id}
                  style={{ ...getCommonPinningStyles(cell.column) }}
                >
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
              {pageSizeOptions.map((pageSize) => (
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
    </div>
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
        } else if (e.target.value === "false") {
          column.setFilterValue(false);
        } else {
          column.setFilterValue(null);
        }
      }}
      value={columnFilterValue?.toString()}
    >
      <option value="">All</option>
      <option value="true">yes</option>
      <option value="false">no</option>
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
