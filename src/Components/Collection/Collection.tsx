// import { AddressRecord } from "../../types/APIDataTypes";
import React from "react";
import { useGetCollectionInfo } from "../../api/hooks";
import { CollectionSummaryTable } from "./CollectionSummaryTable/CollectionSummaryTable";
import { columns as buildingColumns } from "./BuildingTableColumns";
import { Table } from "../Table/Table";
import "./style.scss";

type CollectionProps = {
  collection: string;
};

export const Collection: React.FC<CollectionProps> = ({ collection }) => {
  const { data, error, isLoading } = useGetCollectionInfo(collection);

  return (
    <div style={{ minHeight: "1500px" }}>
      {isLoading && <div>loading...</div>}
      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
      {data && (
        <>
          <h3>Summary Table</h3>
          <CollectionSummaryTable data={data} />
          <h3>Building Table</h3>
          <Table
            data={data.bldg_data}
            columns={buildingColumns}
            initialSorting={[{ id: "rs_units", desc: true }]}
          />
        </>
      )}
    </div>
  );
};
