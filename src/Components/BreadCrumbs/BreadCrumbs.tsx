import { Icon } from "@justfixnyc/component-library";
import { ReactNode } from "react";
import "./style.scss";

interface BreadCrumbs {
  crumbs: ReactNode[];
}
export const BreadCrumbs: React.FC<BreadCrumbs> = ({ crumbs }) => {
  console.log({ crumbs });
  const crumbpath = crumbs.flatMap((crumb, index, array) => {
    if (index !== array.length - 1) {
      return [
        <span key={index}>{crumb}</span>,
        <span key={index} className="breadCrumbs__caret">
          <Icon icon="caretRight" className="" />
        </span>,
      ];
    }
    return (
      <span key={index} className="breadCrumbs__last-crumb">
        {crumb}
      </span>
    );
  });
  return <div className="breadCrumbs">{crumbpath}</div>;
};
