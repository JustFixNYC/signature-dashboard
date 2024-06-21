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
          {data.collection_type === "landlord" && (
            <h3 className="landlord-name">{data.collection_name}</h3>
          )}

          <h2>Key Indicators</h2>
          <CollectionSummaryTable data={data} />

          <h2>Building Table</h2>
          <p>
            {data.bldg_data.length} buildings in {data.collection_name}
          </p>
          <Table
            data={data.bldg_data}
            columns={buildingColumns}
            {...(data.collection_type === 'lender' && {pagination: true, pageSize: 100})}
            initialState={{
              sorting: [{ id: "units_res", desc: true }],
              columnPinning: { left: ["address"] },
            }}
          />
        </>
      )}
    </div>
  );
};
