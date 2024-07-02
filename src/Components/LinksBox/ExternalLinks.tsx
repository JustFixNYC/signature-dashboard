import { BuildingInfo } from "../../types/APIDataTypes";
import Link from "../JFCLLinkExternal";
import "./style.scss";

interface RelatedLinksProps {
  buildingInfo: BuildingInfo;
}

export const ExternalLinks: React.FC<RelatedLinksProps> = ({
  buildingInfo,
}) => {
  const googleMapURL =
    "https://www.google.com/maps/place/" +
    encodeURIComponent(
      `${buildingInfo.address}, ${buildingInfo.borough}, NY ${buildingInfo.zip}`
    );
  return (
    <>
      {buildingInfo && (
        <div className="related-links related-links-external">
          <h3 className="related-links-header">External Links</h3>
          <Link href={buildingInfo.link_acris} className="related-link">
            View documents on ACRIS
          </Link>
          <Link href={buildingInfo.link_dob} className="related-link">
            DOB Building Profile
          </Link>
          <Link href={buildingInfo.link_hpd} className="related-link">
            HPD Building Profile
          </Link>
          <Link href={buildingInfo.link_wow} className="related-link">
            Who Owns What
          </Link>
          <Link href={buildingInfo.link_dap} className="related-link">
            ANHD DAP Portal
          </Link>
          <Link href={buildingInfo.link_political} className="related-link">
            Political Representatives
          </Link>
          <Link href={googleMapURL} className="related-link">
            View on Google Maps
          </Link>
        </div>
      )}
    </>
  );
};
