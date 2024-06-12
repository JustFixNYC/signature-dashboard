// import { AddressRecord } from "../../types/APIDataTypes";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { useGetCollectionInfo } from "../../api/hooks";
import { CollectionSummaryTable } from "./CollectionSummaryTable/CollectionSummaryTable";
import { CollectionBuildingTable } from "./CollectionBuildingTable/CollectionBuildingTable";

export const CollectionPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const collection = searchParams.get("collection") || "";

  const { data, error, isLoading } = useGetCollectionInfo(collection);

  return (
    <div style={{ minHeight: "1500px" }}>
      <h2>Collection Page</h2>
      {isLoading && <div>loading...</div>}
      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
      {/* {data && <pre>{JSON.stringify(data, null, 2)}</pre>} */}
      {data && (
        <>
          <h3>Summary Table</h3>
          <CollectionSummaryTable data={data} />
          <h3>Building Table</h3>
          <CollectionBuildingTable data={data.bldg_data} />
        </>
      )}
    </div>
  );
};
