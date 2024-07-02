import { BuildingInfo } from "../../types/APIDataTypes";
import JFCLLinkExternal from "../JFCLLinkExternal";
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
          <JFCLLinkExternal
            href={buildingInfo.link_acris}
            className="related-link"
            target="_blank"
          >
            View documents on ACRIS
          </JFCLLinkExternal>
          <JFCLLinkExternal
            href={buildingInfo.link_dob}
            className="related-link"
            target="_blank"
          >
            DOB Building Profile
          </JFCLLinkExternal>
          <JFCLLinkExternal
            href={buildingInfo.link_hpd}
            className="related-link"
            target="_blank"
          >
            HPD Building Profile
          </JFCLLinkExternal>
          <JFCLLinkExternal
            href={buildingInfo.link_wow}
            className="related-link"
            target="_blank"
          >
            Who Owns What
          </JFCLLinkExternal>
          <JFCLLinkExternal
            href={buildingInfo.link_dap}
            className="related-link"
            target="_blank"
          >
            ANHD DAP Portal
          </JFCLLinkExternal>
          <JFCLLinkExternal
            href={buildingInfo.link_political}
            className="related-link"
            target="_blank"
          >
            Political Representatives
          </JFCLLinkExternal>
          <JFCLLinkExternal
            href={googleMapURL}
            className="related-link"
            target="_blank"
          >
            View on Google Maps
          </JFCLLinkExternal>
        </div>
      )}
    </>
  );
};
