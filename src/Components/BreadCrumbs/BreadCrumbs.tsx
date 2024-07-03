import { Icon } from "@justfixnyc/component-library";
import "./style.scss";
import { Link } from "react-router-dom";

interface BreadCrumbs {
  crumbs: { path?: string; name?: string }[];
}
export const BreadCrumbs: React.FC<BreadCrumbs> = ({ crumbs }) => {
  const crumbpath = crumbs.flatMap((crumb, index, array) => {
    if (index !== array.length - 1) {
      return [
        <Link key={index} to={crumb.path ?? "/"} className="jfcl-link">
          {crumb.name}
        </Link>,
        <span key={index + "caret"} className="breadCrumbs__caret">
          <Icon icon="caretRight" className="" />
        </span>,
      ];
    }
    return (
      <span key={index} className="breadCrumbs__last-crumb">
        {crumb.name}
      </span>
    );
  });
  return <div className="breadCrumbs">{crumbpath}</div>;
};
