// import { AddressRecord } from "../../types/APIDataTypes";
import React from "react";
import "./style.scss";
import { Collection } from "../../Collection/Collection";
import { BreadCrumbs } from "../../BreadCrumbs/BreadCrumbs";
import { PageTitle } from "../../PageTitle/PageTitle";
import {
  useGetCollectionInfo,
  useGetDatasetLastUpdated,
} from "../../../api/hooks";
import { CollectionSummaryTable } from "../../Collection/CollectionSummaryTable/CollectionSummaryTable";
import { InternalLinks } from "../../LinksBox/InternalLinks";
import { DownloadMultiBuildingCSV } from "../../CSVDownload/CSVDownload";
import { SectionHeader } from "../../SectionHeader/SectionHeader";
import {
  TableOfContents,
  TOCHeader,
  TOCList,
  TOCItem,
} from "../../TableOfContents/TableOfContents";

interface LenderInfoProps {
  lender: string;
}

export const LenderInfo: React.FC<LenderInfoProps> = ({ lender }) => {
  const { data, error, isLoading } = useGetCollectionInfo(lender);
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
          <div className="top-bar">
            <BreadCrumbs
              crumbs={[
                { path: "/lenders", name: "Lenders" },
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
          <PageTitle>{data.collection_name}</PageTitle>

          <div className="layout-two-col">
            <div>
              <TableOfContents>
                <TOCHeader>On this page</TOCHeader>
                <TOCList>
                  <TOCItem href="#summary-stats">Summary stats</TOCItem>
                  <TOCItem href="#trend-charts">Trend charts</TOCItem>
                  <TOCItem href="#buildings-table">Buildings table</TOCItem>
                  <TOCItem href="#map">Map</TOCItem>
                </TOCList>
              </TableOfContents>
              <SectionHeader id="summary-stats">Summary stats</SectionHeader>
              <CollectionSummaryTable
                data={data}
                lastUpdatedData={lastUpdatedData}
              />
            </div>
            <div>
              <aside className="related-links-container">
                <InternalLinks collectionInfo={data} />
              </aside>
            </div>
          </div>

          <Collection collection={lender} data={data} />
        </>
      )}
    </>
  );
};
