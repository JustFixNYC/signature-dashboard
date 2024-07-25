// import { AddressRecord } from "../../types/APIDataTypes";
import React from "react";
import { Collection } from "../../Collection/Collection";
import { PageTitle } from "../../PageTitle/PageTitle";
import {
  useGetCollectionInfo,
  useGetDatasetLastUpdated,
} from "../../../api/hooks";
import { CollectionSummaryTable } from "../../Collection/CollectionSummaryTable/CollectionSummaryTable";
import {
  TableOfContents,
  TOCHeader,
  TOCList,
  TOCItem,
} from "../../TableOfContents/TableOfContents";
import { SectionHeader } from "../../SectionHeader/SectionHeader";
import { Loading } from "../../Loading/Loading";
import { formatNumber } from "../../../util/helpers";

export const EntirePortfolio: React.FC = () => {
  const { data, error, isLoading } = useGetCollectionInfo("all");
  const {
    data: lastUpdatedData,
    error: lastUpdatedError,
    isLoading: lastUpdatedIsLoading,
  } = useGetDatasetLastUpdated();
  return (
    <>
      {isLoading && lastUpdatedIsLoading && <Loading />}
      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
      {lastUpdatedError && (
        <pre>{JSON.stringify(lastUpdatedError, null, 2)}</pre>
      )}
      {data && lastUpdatedData && (
        <>
          <div className="layout-two-col">
            <div>
              <PageTitle>Entire Signature Portfolio</PageTitle>

              <p className="signature-context">
                There are {formatNumber(data.buildings) as string}{" "}
                rent-regulated buildings on the Signature Portfolio Dashboard.
                See below for aggregate stats on the entire portfolio and a list
                of all buildings.
              </p>
              <TableOfContents>
                <TOCHeader>On this page</TOCHeader>
                <TOCList>
                  <TOCItem href="#summary-stats">Summary stats</TOCItem>
                  <TOCItem href="#trend-charts">Trend charts</TOCItem>
                  <TOCItem href="#buildings-table">Buildings table</TOCItem>
                </TOCList>
              </TableOfContents>

              <SectionHeader id="summary-stats">Summary stats</SectionHeader>
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
