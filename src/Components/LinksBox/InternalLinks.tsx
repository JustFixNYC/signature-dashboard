import { BuildingInfo, CollectionInfo } from "../../types/APIDataTypes";
import Link from "../JFCLLinkInternal";
import "./style.scss";

interface RelatedLinksProps {
  buildingInfo?: BuildingInfo;
  collectionInfo?: CollectionInfo;
}

export const InternalLinks: React.FC<RelatedLinksProps> = ({
  buildingInfo,
  collectionInfo,
}) => {
  return (
    <>
      {buildingInfo && (
        <div className="related-links">
          <h3 className="related-links-header">Related pages</h3>
          {buildingInfo.landlord && (
            <Link
              href={`/landlords?landlord=${buildingInfo.landlord_slug}`}
              className="related-link"
            >
              {buildingInfo.landlord}'s Buildings
            </Link>
          )}
          <Link
            href={`/lenders?lender=${buildingInfo.lender_slug}`}
            className="related-link"
          >
            {buildingInfo.lender} Portfolio
          </Link>
          <Link href={"/buildings"} className="related-link">
            Entire Signature Portfolio
          </Link>
        </div>
      )}
      {collectionInfo && (
        <div className="related-links">
          <h3 className="related-links-header">Related pages</h3>
          <Link
            href={`/lenders?lender=${collectionInfo.bldg_data[0].lender_slug}`}
            className="related-link"
          >
            {collectionInfo.bldg_data[0].lender} Portfolio
          </Link>
          <Link href={"/buildings"} className="related-link">
            Entire Signature Portfolio
          </Link>
        </div>
      )}
    </>
  );
};
