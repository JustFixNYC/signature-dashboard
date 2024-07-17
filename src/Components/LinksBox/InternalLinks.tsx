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
        <div className="related-links related-links-internal">
          {buildingInfo.landlord && (
            <>
              <h3 className="related-links-header">Landlord</h3>
              <Link
                href={`/landlords?landlord=${buildingInfo.landlord_slug}`}
                className="related-link"
              >
                {buildingInfo.landlord}'s Buildings
              </Link>
            </>
          )}
          <h3 className="related-links-header">Lender</h3>
          <Link
            href={`/lenders?lender=${buildingInfo.lender_slug}`}
            className="related-link"
          >
            {buildingInfo.lender} Portfolio
          </Link>
        </div>
      )}
      {collectionInfo && (
        <div className="related-links related-links-internal">
          <h3 className="related-links-header">Lender</h3>
          <Link
            href={`/lenders?lender=${collectionInfo.bldg_data[0].lender_slug}`}
            className="related-link"
          >
            {collectionInfo.bldg_data[0].lender} Portfolio
          </Link>
        </div>
      )}
    </>
  );
};
