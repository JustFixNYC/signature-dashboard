// import { AddressRecord } from "../../types/APIDataTypes";
import React from "react";
import { columns as buildingColumns } from "./BuildingTableColumns";
import { PageSizeOptions, Table } from "../Table/Table";
import { BuildingInfo } from "../../types/APIDataTypes";

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
        sorting: [{ id: "units_res", desc: true }],
        columnPinning: { left: ["address"] },
      }}
      {...props}
    />
  );
};
