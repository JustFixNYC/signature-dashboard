import React from "react";
import { Link } from "@justfixnyc/component-library";
import "./style.scss";
import { Collection } from "../../Collection/Collection";
import { BreadCrumbs } from "../../BreadCrumbs/BreadCrumbs";
import { PageTitle } from "../../PageTitle/PageTitle";
import {
  useGetCollectionInfo,
  useGetDatasetLastUpdated,
} from "../../../api/hooks";
import { CollectionSummaryTable } from "../../Collection/CollectionSummaryTable/CollectionSummaryTable";
import { DownloadMultiBuildingCSV } from "../../CSVDownload/CSVDownload";
import { SectionHeader } from "../../SectionHeader/SectionHeader";
import {
  TableOfContents,
  TOCHeader,
  TOCList,
  TOCItem,
} from "../../TableOfContents/TableOfContents";
import { Loading } from "../../Loading/Loading";
import { formatNumber } from "../../../util/helpers";

interface LoanPoolInfoProps {
  loanPool: string;
}

export const LoanPoolInfo: React.FC<LoanPoolInfoProps> = ({ loanPool }) => {
  const { data, error, isLoading } = useGetCollectionInfo(loanPool);
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
          <div className="top-bar">
            <BreadCrumbs
              crumbs={[
                { path: "/loan-pools", name: "Loan pool" },
                { name: data.collection_name },
              ]}
            />
            <div className="top-bar-actions">
              <DownloadMultiBuildingCSV
                data={data}
                labelText={`Download ${data.collection_name} data`}
              />
            </div>
          </div>
          <PageTitle className="loan-pool-page__page-title">
            {data.collection_slug === "cpc" &&
              "Community Preservation Corporation (CPC)"}
            {data.collection_slug === "santander" && "Santander Bank"}
          </PageTitle>
          <p className="loan-pool-context">
            {data.collection_name} manages the mortgages for{" "}
            {formatNumber(data.buildings_agg) as string} rent-regulated
            buildings in the Signature Portfolio.{" "}
            <Link href="/loan-pools">About the loan pools</Link>
          </p>

          <div className="layout-two-col">
            <div>
              <TableOfContents>
                <TOCHeader>On this page</TOCHeader>
                <TOCList>
                  <TOCItem href="#summary-stats">Summary stats</TOCItem>
                  <TOCItem href="#trend-charts">Trend charts</TOCItem>
                  <TOCItem href="#map">Loan pool map</TOCItem>
                  <TOCItem href="#buildings-table">Buildings table</TOCItem>
                </TOCList>
              </TableOfContents>
              <SectionHeader id="summary-stats">Summary stats</SectionHeader>
              <CollectionSummaryTable
                data={data}
                lastUpdatedData={lastUpdatedData}
              />
            </div>
          </div>

          <Collection collection={loanPool} data={data} />
        </>
      )}
    </>
  );
};
