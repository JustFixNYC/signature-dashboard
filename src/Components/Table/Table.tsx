import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  ColumnSort,
  InitialTableState,
  PaginationState,
  RowData,
  TableOptions,
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import "./style.scss";
import DebouncedInput from "../DebouncedInput";
import { CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import { ColumnFilter } from "./ColumnFilter/ColumnFilter";
import { Button } from "@justfixnyc/component-library";
import { useSearchParams } from "react-router-dom";
import {
  encodeForURI,
  formatNumber,
  getHiddenColumns,
  getObjFromEncodedParam,
  useOnScreen,
} from "../../util/helpers";
import { FilterChips } from "../FilterChips/FilterChips";
import { PageSizeOptions, Pagination } from "./Pagination";
import classNames from "classnames";
import { LAST_COLUMN_ID } from "../BuildingTable/BuildingTableColumns";
import { gtmPush } from "../../google-tag-manager";
import { useAuth } from "../../auth";

export interface TableProps<T extends object> {
  data: T[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<T, any>[];
  pagination?: boolean;
  pageSize?: PageSizeOptions;
  initialState?: InitialTableState;
  initialSorting?: ColumnSort[];
  qsPrefix: string;
}

declare module "@tanstack/react-table" {
  // allows us to define custom properties for our columns (copied from WoW)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: "range" | "boolean" | "select" | "text";
    inputWidth?: string;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getCommonPinningStyles = (column: Column<any>): CSSProperties => {
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn =
    isPinned === "left" && column.getIsLastColumn("left");

  return {
    boxShadow: isLastLeftPinnedColumn
      ? "-2px 0 0px 0px #c5ccd1 inset"
      : undefined,
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
    right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
    backgroundColor: isPinned ? "white" : "initial",
    position: isPinned ? "sticky" : "relative",
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
  };
};

export const Table = <T extends object>(
  props: TableProps<T> & { className?: string },
) => {
  const {
    data,
    columns,
    initialState,
    initialSorting,
    qsPrefix,
    pagination: hasPagination,
    pageSize = 10,
    className,
  } = props;
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: pageSize,
  });

  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const FILTERS_PARAM_KEY = `${qsPrefix}_f`;
  const SORTING_PARAM_KEY = `${qsPrefix}_s`;
  const VISIBILITY_PARAM_KEY = `${qsPrefix}_h`;

  // Get table setting from query string
  const columnVisibilityParams = getObjFromEncodedParam(
    searchParams,
    VISIBILITY_PARAM_KEY,
  );
  const columnFiltersParams = getObjFromEncodedParam(
    searchParams,
    FILTERS_PARAM_KEY,
  );
  const sortingParams = getObjFromEncodedParam(searchParams, SORTING_PARAM_KEY);

  // Setup tables settings in state
  const [sorting, setsorting] = useState<ColumnSort[]>(
    sortingParams ? sortingParams : initialSorting ? initialSorting : [],
  );
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    columnFiltersParams ?? [],
  );
  const [columnVisibility, setColumnVisibility] = useState(
    columnVisibilityParams ?? {},
  );

  const containerRef = useRef<HTMLDivElement>(null);

  // Update query params for table sorting, filtering, and column visibility
  useEffect(() => {
    setSearchParams(
      (params) => {
        // SORT
        if (!sorting.length) {
          params.delete(SORTING_PARAM_KEY);
        } else {
          const encodedsorting = encodeForURI(sorting);
          params.set(SORTING_PARAM_KEY, encodedsorting);
        }

        // FILTERS
        if (!columnFilters.length) {
          params.delete(FILTERS_PARAM_KEY);
        } else {
          const encodedColumnFilters = encodeForURI(columnFilters);
          params.set(FILTERS_PARAM_KEY, encodedColumnFilters);
        }

        // HIDDEN COLUMNS
        const hiddenColumns = getHiddenColumns(columnVisibility);
        if (!Object.keys(hiddenColumns).length) {
          params.delete(VISIBILITY_PARAM_KEY);
        } else {
          const encodedColumnVisibility = encodeForURI(hiddenColumns);
          params.set(VISIBILITY_PARAM_KEY, encodedColumnVisibility);
        }

        return params;
      },
      { replace: true },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorting, columnFilters, columnVisibility, setSearchParams]);

  // Fires one GTM event for each column filter applied. Logs each new filter
  // when it's first applied. Won't count multiple changes to a single filter.
  // Will count each filter when landing on page with filters via query params.
  const [pastFilters, setPastFilters] = useState<string[]>([]);
  useEffect(() => {
    const currentFilters = columnFilters.map((x) => x.id);
    const newFilters = currentFilters.filter((x) => !pastFilters.includes(x));
    newFilters.forEach((column) => {
      gtmPush("sig_table_filter", {
        column,
        user_type: user,
        active_filters: currentFilters.length,
      });
    });
    setPastFilters(currentFilters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnFilters]);

  const options: TableOptions<T> = {
    data,
    columns,
    filterFns: {},
    initialState: { ...initialState },
    state: {
      columnVisibility,
      columnFilters,
      sorting: sorting,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setsorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client side filtering
    getFacetedUniqueValues: getFacetedUniqueValues(), // generate unique values for select filter/autocomplete
    debugTable: false,
    debugHeaders: false,
    debugColumns: false,
  };

  if (hasPagination) {
    options.getPaginationRowModel = getPaginationRowModel();
    options.onPaginationChange = setPagination;
    if (options.state) {
      options.state.pagination = pagination;
    }
  }

  const table = useReactTable(options);

  const clearFilters = () => {
    table.resetColumnFilters();
  };
  const filteredRecordCount = table.getRowCount();
  const unFilteredRecordCount = table.getPreFilteredRowModel().rows.length;

  const lastColumnRef = useRef<HTMLTableCellElement>(null);
  const isLastColumnVisible = useOnScreen(lastColumnRef);
  /**
   * For older browsers that do not support the `useOnScreen` hook,
   * let's hide the dynamic scroll fade by default.
   */
  const isOlderBrowser = typeof IntersectionObserver === "undefined";
  /**
   * Let's hide the fade out on the right edge of the table if:
   * - We've scrolled to the last column OR
   * - We're using an older browser that cannot detect where we've scrolled
   */
  const hideScrollFade = isOlderBrowser || isLastColumnVisible;

  return (
    <>
      <div className="table-buttons-container">
        <ColumnFilter table={table} />
        <FilterChips
          removeFn={(id: string) => {
            table.setColumnFilters((filters) => {
              return filters.filter((f) => f.id !== id);
            });
          }}
          columnFilters={columnFilters}
        />
      </div>
      <div className="collection-building-table__record-count-container">
        Showing{" "}
        {filteredRecordCount === unFilteredRecordCount
          ? "all "
          : `${formatNumber(filteredRecordCount)} of `}
        <>{formatNumber(table.getPreFilteredRowModel().rows.length)}</> records
        {!!columnFilters.length && (
          <button onClick={clearFilters} className="clear-all jfcl-link">
            Clear all filters
          </button>
        )}
      </div>
      <div
        className={classNames(
          "table-container-wrapper",
          hideScrollFade && "hide-scroll-fade",
        )}
      >
        <div className="table-container" ref={containerRef}>
          <table className={classNames("collection-building-table", className)}>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const sortIcon =
                      header.column.getIsSorted() === "asc"
                        ? "arrowUpShortWide"
                        : header.column.getIsSorted() === "desc"
                          ? "arrowDownWideShort"
                          : "arrowUpArrowDown";
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
                          <div
                            className={
                              headerGroup.depth === 0
                                ? "column-header column-header--group"
                                : "column-header"
                            }
                          >
                            <div className="column-header__label">
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                              {header.column.getCanSort() && (
                                <span className="column-header__sort-icons">
                                  <Button
                                    iconOnly
                                    labelText=""
                                    labelIcon={sortIcon}
                                    size="small"
                                    variant="tertiary"
                                    className={classNames(
                                      "column-header__sort-icon",
                                      sortIcon === "arrowUpArrowDown" &&
                                        "unsorted",
                                    )}
                                    onClick={(e) => {
                                      const toggleSort =
                                        header.column.getToggleSortingHandler();
                                      toggleSort && toggleSort(e);
                                      gtmPush("sig_table_sort", {
                                        column: header.column.columnDef.id,
                                        user_type: user,
                                      });
                                    }}
                                  />
                                </span>
                              )}
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
                  {row.getVisibleCells().map((cell) => {
                    const valueExists =
                      cell.getValue() !== null && cell.getValue() !== undefined;
                    return (
                      <td
                        key={cell.id}
                        style={{ ...getCommonPinningStyles(cell.column) }}
                        ref={
                          cell.column.id === LAST_COLUMN_ID
                            ? lastColumnRef
                            : undefined
                        }
                      >
                        {valueExists
                          ? flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )
                          : "N/A"}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          {/* ------------------------------------------------------- */}
          {/* -------------- Pagination Footer ---------------------- */}
          {/* ------------------------------------------------------- */}
          {hasPagination && <Pagination table={table} />}
        </div>
      </div>
    </>
  );
};

function Filter<T>({ column }: { column: Column<T, unknown> }) {
  const columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta ?? {};

  const uniqeValues = column.getFacetedUniqueValues();

  const sortedUniqueValues = useMemo(
    () =>
      filterVariant === "range" || filterVariant === "boolean"
        ? []
        : Array.from(uniqeValues.keys())
            .filter((v) => v !== undefined)
            .sort((a, b) => a - b),
    [uniqeValues, filterVariant],
  );
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
      value={
        columnFilterValue === true || columnFilterValue === false
          ? columnFilterValue.toString()
          : ""
      }
    >
      <option value="">All</option>
      <option value="true">yes</option>
      <option value="false">no</option>
    </select>
  ) : filterVariant === "select" ? (
    <select
      onChange={(e) => column.setFilterValue(e.target.value)}
      value={(columnFilterValue ?? "") as string}
    >
      <option value="">All</option>
      {sortedUniqueValues.map((value) => {
        return (
          <option value={value} key={value}>
            {value}
          </option>
        );
      })}
    </select>
  ) : (
    <>
      <datalist id={column.id + "list"}>
        {sortedUniqueValues.map((value) => (
          <option value={value} key={value} />
        ))}
      </datalist>
      <DebouncedInput
        type="text"
        value={(columnFilterValue ?? "") as string}
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
        className="w-36 border shadow rounded"
        list={column.id + "list"}
      />
      <div className="h-1" />
    </>
  );
}
