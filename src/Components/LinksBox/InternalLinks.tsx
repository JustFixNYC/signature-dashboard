import { BuildingInfo, CollectionInfo } from "../../types/APIDataTypes";
import { loanPoolNameLong } from "../../util/helpers";
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
          <h3 className="related-links-header">Loan pool</h3>
          <Link
            href={`/loan-pools?loan-pool=${buildingInfo.loan_pool_slug}`}
            className="related-link"
          >
            {loanPoolNameLong(buildingInfo.loan_pool_slug)}
          </Link>
        </div>
      )}
      {collectionInfo && (
        <div className="related-links related-links-internal">
          <h3 className="related-links-header">Loan pool</h3>
          <Link
            href={`/loan-pools?loan-pool=${collectionInfo.bldg_data[0].loan_pool_slug}`}
            className="related-link"
          >
            {loanPoolNameLong(collectionInfo.bldg_data[0].loan_pool_slug)}
          </Link>
        </div>
      )}
    </>
  );
};
