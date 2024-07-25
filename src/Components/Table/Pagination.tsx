import { Button } from "@justfixnyc/component-library";
import { Table } from "@tanstack/react-table";

type PaginationProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  table: Table<any>;
};

const pageSizeOptions = [10, 20, 30, 40, 50, 100] as const;
export type PageSizeOptions = (typeof pageSizeOptions)[number];

export const Pagination: React.FC<PaginationProps> = ({ table }) => {
  return (
    <div className="pagination-container">
      <div className="pagination-controls">
        <div className="pagination-controls__page-size">
          <select
            className=""
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
        <span className="pagination-controls__pages">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount().toLocaleString()}
        </span>
        <Button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          labelText="previous page"
          variant="secondary"
          size="small"
          labelIcon="arrowLeft"
          iconOnly
          className="pagination-controls__prev-page"
        />
        <Button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          labelText="next page"
          variant="secondary"
          size="small"
          labelIcon="arrowRight"
          iconOnly
          className="pagination-controls__next-page"
        />
      </div>
      {/* <pre>{JSON.stringify(table.getState().pagination, null, 2)}</pre> */}
    </div>
  );
};
