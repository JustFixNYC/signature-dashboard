import { gtmPush } from "../../google-tag-manager";
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
            onClick={() => {
              gtmPush("sig_related_link", { to: "acris" });
            }}
          >
            View documents on ACRIS
          </JFCLLinkExternal>
          <JFCLLinkExternal
            href={buildingInfo.link_dob}
            className="related-link"
            onClick={() => {
              gtmPush("sig_related_link", { to: "dob" });
            }}
          >
            DOB Building Profile
          </JFCLLinkExternal>
          <JFCLLinkExternal
            href={buildingInfo.link_hpd}
            className="related-link"
            onClick={() => {
              gtmPush("sig_related_link", { to: "hpd" });
            }}
          >
            HPD Building Profile
          </JFCLLinkExternal>
          <JFCLLinkExternal
            href={buildingInfo.link_wow}
            className="related-link"
            onClick={() => {
              gtmPush("sig_related_link", { to: "wow" });
            }}
          >
            Who Owns What
          </JFCLLinkExternal>
          <JFCLLinkExternal
            href={buildingInfo.link_dap}
            className="related-link"
            onClick={() => {
              gtmPush("sig_related_link", { to: "dap" });
            }}
          >
            ANHD DAP Portal
          </JFCLLinkExternal>
          <JFCLLinkExternal
            href={buildingInfo.link_political}
            className="related-link"
            onClick={() => {
              gtmPush("sig_related_link", { to: "political" });
            }}
          >
            Political Representatives
          </JFCLLinkExternal>
          <JFCLLinkExternal
            href={googleMapURL}
            className="related-link"
            onClick={() => {
              gtmPush("sig_related_link", { to: "google-maps" });
            }}
          >
            View on Google Maps
          </JFCLLinkExternal>
        </div>
      )}
    </>
  );
};
