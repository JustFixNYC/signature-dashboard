import { BuildingInfo } from "../../types/APIDataTypes";
import Link from "../JFCLLinkExternal";
import "./style.scss";

interface RelatedLinksProps {
  buildingInfo: BuildingInfo;
}

export const ExternalLinks: React.FC<RelatedLinksProps> = ({
  buildingInfo,
}) => {
  return (
    <>
      {buildingInfo && (
        <div className="related-links">
          <h3 className="related-links-header">External Links</h3>
          <Link href={buildingInfo.link_acris} className="related-link">
            View documents on ACRIS
          </Link>
          <Link href={buildingInfo.link_dap} className="related-link">
            ANHD DAP Portal
          </Link>
          <Link href={buildingInfo.link_dob} className="related-link">
            DOB Building Profile
          </Link>
          <Link href={buildingInfo.link_hpd} className="related-link">
            HPD Building Profile
          </Link>
          <Link
            href={`https://whoownswhat.justfix.org/bbl/${buildingInfo.bbl}`}
            className="related-link"
          >
            Who Owns What
          </Link>
        </div>
      )}
    </>
  );
};
