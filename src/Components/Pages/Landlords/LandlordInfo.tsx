// import { AddressRecord } from "../../types/APIDataTypes";
import React from "react";
import { Collection } from "../../Collection/Collection";
import { BreadCrumbs } from "../../BreadCrumbs/BreadCrumbs";
import { PageTitle } from "../../PageTitle/PageTitle";
import { useGetCollectionInfo } from "../../../api/hooks";
import { CollectionSummaryTable } from "../../Collection/CollectionSummaryTable/CollectionSummaryTable";
import { InternalLinks } from "../../LinksBox/InternalLinks";
import { DownloadMultiBuildingCSV } from "../../CSVDownload/CSVDownload";
import "./style.scss";
import {
  TableOfContents,
  TOCHeader,
  TOCList,
  TOCItem,
} from "../../TableOfContents/TableOfContents";
import { SectionHeader } from "../../SectionHeader/SectionHeader";

interface LandlordInfoProps {
  landlord: string;
}

export const LandlordInfo: React.FC<LandlordInfoProps> = ({ landlord }) => {
  const { data, error, isLoading } = useGetCollectionInfo(landlord);
  return (
    <>
      {isLoading && <div>loading...</div>}
      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
      {data && (
        <>
          <div className="top-bar">
            <BreadCrumbs
              crumbs={[
                { path: "/landlords", name: "Landlords" },
                { name: data.collection_name },
              ]}
            />
            <div className="top-bar-actions">
              <DownloadMultiBuildingCSV
                data={data}
                labelText="Download landlord data"
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
                </TOCList>
              </TableOfContents>
              <SectionHeader id="summary-stats">Summary stats</SectionHeader>
              <CollectionSummaryTable data={data} />
            </div>

            <div>
              <aside className="related-links-container">
                <InternalLinks collectionInfo={data} />
              </aside>
            </div>
          </div>

          <Collection collection={landlord} data={data} />
        </>
      )}
    </>
  );
};
