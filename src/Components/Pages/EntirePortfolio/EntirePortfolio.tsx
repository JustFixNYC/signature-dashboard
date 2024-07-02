// import { AddressRecord } from "../../types/APIDataTypes";
import React from "react";
import { Collection } from "../../Collection/Collection";
import { PageTitle } from "../../PageTitle/PageTitle";
import { useGetCollectionInfo } from "../../../api/hooks";
import { CollectionSummaryTable } from "../../Collection/CollectionSummaryTable/CollectionSummaryTable";

export const EntirePortfolio: React.FC = () => {
  const { data, error, isLoading } = useGetCollectionInfo("all");
  return (
    <>
      {isLoading && <div>loading...</div>}
      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
      {data && (
        <>
          <div className="layout-two-col">
            <div>
              <PageTitle>Entire Signature Portfolio</PageTitle>

              <h3>Key Indicators</h3>
              <CollectionSummaryTable data={data} />
            </div>
            <div></div>
          </div>

          <Collection collection={"all"} data={data} />
        </>
      )}
    </>
  );
};
