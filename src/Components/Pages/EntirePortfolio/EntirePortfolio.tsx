// import { AddressRecord } from "../../types/APIDataTypes";
import React from "react";
import { Collection } from "../../Collection/Collection";
import { PageTitle } from "../../PageTitle/PageTitle";
import {
  useGetCollectionInfo,
  useGetDatasetLastUpdated,
} from "../../../api/hooks";
import { CollectionSummaryTable } from "../../Collection/CollectionSummaryTable/CollectionSummaryTable";

export const EntirePortfolio: React.FC = () => {
  const { data, error, isLoading } = useGetCollectionInfo("all");
  const {
    data: lastUpdatedData,
    error: lastUpdatedError,
    isLoading: lastUpdatedIsLoading,
  } = useGetDatasetLastUpdated();
  return (
    <>
      {isLoading && lastUpdatedIsLoading && <div>loading...</div>}
      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
      {lastUpdatedError && (
        <pre>{JSON.stringify(lastUpdatedError, null, 2)}</pre>
      )}
      {data && lastUpdatedData && (
        <>
          <div className="layout-two-col">
            <div>
              <PageTitle>Entire Signature Portfolio</PageTitle>

              <h3>Key Indicators</h3>
              <CollectionSummaryTable
                data={data}
                lastUpdatedData={lastUpdatedData}
              />
            </div>
            <div></div>
          </div>

          <Collection collection={"all"} data={data} />
        </>
      )}
    </>
  );
};
