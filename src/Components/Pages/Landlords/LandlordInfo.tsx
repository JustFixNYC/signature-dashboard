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
          <div className="layout-two-col">
            <div>
              <PageTitle>{data.collection_name}</PageTitle>

              <h3>Key Indicators</h3>
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
