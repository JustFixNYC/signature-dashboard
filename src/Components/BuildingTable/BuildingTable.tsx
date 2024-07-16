// import { AddressRecord } from "../../types/APIDataTypes";
import React from "react";
import { columns as buildingColumns } from "./BuildingTableColumns";
import { Table } from "../Table/Table";
import { BuildingInfo } from "../../types/APIDataTypes";
import { PageSizeOptions } from "../Table/Pagination";

type BuildingTableProps = {
  data: BuildingInfo[];
  pagination?: boolean;
  pageSize?: PageSizeOptions;
};

export const BuildingTable: React.FC<BuildingTableProps> = ({
  data,
  ...props
}) => {
  return (
    <Table
      data={data}
      columns={buildingColumns}
      initialState={{
        columnPinning: { left: ["address"] },
      }}
      initialSorting={[{ id: "units_res", desc: true }]}
      qsPrefix="b" // NOTE: changing this value will break bookmarked urls
      {...props}
    />
  );
};
