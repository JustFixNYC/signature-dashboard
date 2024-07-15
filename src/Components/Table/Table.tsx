import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
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
import { CSSProperties, Fragment, useMemo, useRef, useState } from "react";
import { ColumnFilter } from "./ColumnFilter/ColumnFilter";
import { Button } from "@justfixnyc/component-library";
import ReactSelect, {
  components,
  ContainerProps,
  GroupBase,
  MenuProps,
  MultiValue,
  Props,
} from "react-select";

const pageSizeOptions = [10, 20, 30, 40, 50, 100] as const;
export type PageSizeOptions = (typeof pageSizeOptions)[number];

const includesMultiple: FilterFn<unknown> = (
  row,
  columnId: string,
  filterValues: string[]
) => {
  // If no filter values, return all rows
  if (!filterValues || !filterValues.length) {
    return true;
  }

  const rowValue = row.getValue<string | null>(columnId)?.toLowerCase();

  // if rowValue is null or undefined do NOT return it in the results
  if (rowValue === null || rowValue === undefined) {
    return false;
  }

  // check if the row value is in the array of filter values
  return filterValues.includes(rowValue);
};

// remove the filter value from filter state if it is falsy (empty string in this case)
includesMultiple.autoRemove = (val: string[]) => !val.length;

// transform/sanitize/format the filter value before it is passed to the filter function
includesMultiple.resolveFilterValue = (val: string) =>
  val.toString().toLowerCase().trim();

export interface TableProps<T extends object> {
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
    filterVariant?: "range" | "boolean" | "select" | "multiselect" | "text";
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
    ...(isPinned && { zIndex: 10 }),
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
  const [columnVisibility, setColumnVisibility] = useState({});

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const containerRef = useRef<HTMLDivElement>(null);

  const options: TableOptions<T> = {
    data,
    columns,
    filterFns: { includesMultiple },
    initialState: { ...initialState },
    state: {
      columnVisibility,
      columnFilters,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
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

  return (
    <>
      <ColumnFilter table={table} />
      {!!columnFilters.length && (
        <Button
          labelText="Clear all filters"
          onClick={clearFilters}
          size="small"
          className="clear-all"
        />
      )}
      <div className="table-container" ref={containerRef}>
        <table className="collection-building-table">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const sortIcon =
                    header.column.getIsSorted() === "asc"
                      ? "arrowUp"
                      : header.column.getIsSorted() === "desc"
                        ? "arrowDown"
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
                        <div className="column-header">
                          <div className="column-header__label">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {header.column.getCanSort() && (
                              <span className="column-header__sort-icons">
                                <Button
                                  iconOnly
                                  labelText=""
                                  labelIcon={sortIcon}
                                  size="small"
                                  variant="tertiary"
                                  className="column-header__sort-icon"
                                  onClick={header.column.getToggleSortingHandler()}
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
                    >
                      {valueExists
                        ? flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
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
                    const page = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
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
    </>
  );
};

function Filter<T>({ column }: { column: Column<T, unknown> }) {
  const columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta ?? {};

  const uniqeValues = column.getFacetedUniqueValues();

  const sortedUniqueValues = useMemo(() => {
    if (filterVariant === "range" || filterVariant === "boolean") {
      return [];
    } else if (filterVariant === "multiselect") {
      return Array.from(uniqeValues.keys())
        .filter((v) => v !== undefined)
        .sort()
        .map((value) => {
          return { value: value, label: value };
        });
    } else
      return Array.from(uniqeValues.keys())
        .filter((v) => v !== undefined)
        .sort();
  }, [uniqeValues, filterVariant]);
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
  ) : filterVariant === "multiselect" ? (
    <div>
      <ReactSelect
        options={sortedUniqueValues}
        classNamePrefix="react-select"
        value={
          columnFilterValue
            ? (columnFilterValue as MultiValue<string>[]).map(
                (val: MultiValue<string>) => {
                  return { value: val, label: val };
                }
              )
            : null
        }
        onChange={(selections) => {
          column.setFilterValue(selections.map((option) => option.value));
        }}
        isMulti
        components={{ Menu }}
      />
    </div>
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

const Menu = (
  props: MenuProps<{ value: MultiValue<string>; label: MultiValue<string> }>
) => {
  console.log(props);
  return (
    <Fragment>
      <components.Menu {...props}>
        <>
          <SelectedValuesContainer
            isDisabled={props.selectProps.isDisabled}
            isFocused={false}
            {...props}
          />
          {props.children}
        </>
      </components.Menu>
    </Fragment>
  );
};

function SelectedValuesContainer<
  Option,
  IsMulti extends boolean = true,
  GroupType extends GroupBase<Option> = GroupBase<Option>,
>({
  isDisabled,
  getValue,
  ...props
}: ContainerProps<Option, IsMulti, GroupType>) {
  const { getOptionValue, classNamePrefix } = props.selectProps as Props<
    Option,
    IsMulti,
    GroupType
  >;
console.log(props)
  const getKey = (opt: Option, index: number) =>
    `${getOptionValue ? getOptionValue(opt) : "option"}-${index}`;

  const toMultiValue = (opt: Option, index: number) => {
    return (
      <components.MultiValue
        getValue={getValue}
        {...props}
        components={{
          Container: components.MultiValueContainer,
          Label: components.MultiValueLabel,
          Remove: components.MultiValueRemove,
        }}
        isDisabled={isDisabled}
        key={getKey(opt, index)}
        index={index}
        removeProps={{ ...props.innerProps }}
        data={opt}
      >
        {/* @ts-expect-error (value isn't recognizing the available properties of Option type) */}
        {opt.label}
      </components.MultiValue>
    );
  };

  return (
    <div className={`${classNamePrefix}__selected-value-container`}>
      {getValue().map(toMultiValue)}
    </div>
  );
}
