import { createColumnHelper } from "@tanstack/react-table";
import { AddressRecord } from "../../types/APIDataTypes";

const columnHelper = createColumnHelper<AddressRecord>();

export const portfolioColumns = [
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
  columnHelper.group({
    id: "information",
    header: () => "Information",
    columns: [
      columnHelper.accessor("yearbuilt", {
        header: "Built",
      }),
      columnHelper.accessor("unitsres", {
        header: "Units",
      }),
    ],
  }),
  columnHelper.group({
    id: "rs_units",
    header: () => "RS Units",
    columns: [
      columnHelper.accessor("rsunits2007", {
        header: "2007",
      }),
      columnHelper.accessor("rsunitslatest", {
        header: "rsunitslatest",
      }),
    ],
  }),
];
