// import { AddressRecord } from "../../types/APIDataTypes";
import React from "react";
import "./style.scss";
import { Collection } from "../../Collection/Collection";
import { BreadCrumbs } from "../../BreadCrumbs/BreadCrumbs";
import { PageTitle } from "../../PageTitle/PageTitle";
import { useGetCollectionInfo } from "../../../api/hooks";
import { CollectionSummaryTable } from "../../Collection/CollectionSummaryTable/CollectionSummaryTable";
import { InternalLinks } from "../../LinksBox/InternalLinks";

interface LenderInfoProps {
  lender: string;
}

export const LenderInfo: React.FC<LenderInfoProps> = ({ lender }) => {
  const { data, error, isLoading } = useGetCollectionInfo(lender);
  return (
    <>
      {isLoading && <div>loading...</div>}
      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
      {data && (
        <>
          <BreadCrumbs
            crumbs={[
              { path: "/lenders", name: "Lenders" },
              { name: data.collection_name },
            ]}
          />
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

          <Collection collection={lender} data={data} />
        </>
      )}
    </>
  );
};
