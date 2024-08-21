import { gtmPush } from "../../google-tag-manager";
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
                onClick={() => {
                  gtmPush("sig_related_link", { to: "landlord" });
                }}
              >
                {buildingInfo.landlord}'s Buildings
              </Link>
            </>
          )}
          <h3 className="related-links-header">Loan pool</h3>
          <Link
            href={`/loan-pools?loan-pool=${buildingInfo.loan_pool_slug}`}
            className="related-link"
            onClick={() => {
              gtmPush("sig_related_link", { to: "loan-pool" });
            }}
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
            onClick={() => {
              gtmPush("sig_related_link", { to: "loan-pool" });
            }}
          >
            {loanPoolNameLong(collectionInfo.bldg_data[0].loan_pool_slug)}
          </Link>
        </div>
      )}
    </>
  );
};
