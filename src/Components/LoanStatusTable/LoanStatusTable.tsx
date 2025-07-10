import { HTMLAttributes, useState } from "react";
import classNames from "classnames";
import { Icon } from "@justfixnyc/component-library";
import { DetailTable } from "../DetailTable/DetailTable";
import { formatDate, formatLastUpdatedDate } from "../../util/helpers";
import { BuildingInfo, LoanHistory } from "../../types/APIDataTypes";
import JFCLLinkExternal from "../JFCLLinkExternal";

import "./LoanStatusTable.scss";

const loanStatusLabel = (statusEntry: LoanHistory) => {
  const { status, date } = statusEntry;
  switch (status) {
    case "left_program":
      return `Satisfied on ${formatDate(date)}`;
    case "foreclosure":
      return `Foreclosure began on ${formatDate(date)}`;
    case "refinanced":
      return `Refinanced on ${formatDate(date)}`;
    case "write_down":
      return `Refinanced on ${formatDate(date)} with debt write down`;
    case "rehab":
      return `Refinanced on ${formatDate(date)} as part of a rehabilitation plan`;
    case "write_down_rehab":
      return `Refinanced on ${formatDate(date)} with debt write down, as part of a rehabilitation plan`;
  }
};

export const loanStatusDescription = (buildingInfo: BuildingInfo) => {
  const { status_current } = buildingInfo;

  // TODO: if we need to give the number of refinancing/write downs in the
  // description, then we'll need to pull out the status_info and count them up

  switch (status_current) {
    case "pending":
      return "The borrower and the lender are in discussion to finalize the specific terms and conditions of the loan agreement.";
    case "left_program":
      return "The building is no longer a part of the joint venture program since the loan has been paid off in full.";
    case "foreclosure":
      return "The lender has begun legal proceedings to seize and sell the borrower's property due to non-payment of the loan.";
    case "refinanced":
      return "The building has an active mortgage held by CPC. It was refinanced, meaning that the mortgage terms were adjusted by the lender.";
    case "write_down":
      return "The building has an active mortgage held by CPC. It was refinanced, meaning that the mortgage terms were adjusted by the lender. There was 1 debt write down, which means that the lender paid off part of the loan.";
    case "rehab":
      return "The building has an active mortgage held by CPC. It was refinanced, meaning that the mortgage terms were adjusted by the lender. [Sentence explaining rehabilitation plan].";
    case "write_down_rehab":
      return "The building has an active mortgage held by CPC. It was refinanced, meaning that the mortgage terms were adjusted by the lender. There was 1 debt write down, which means that the lender paid off part of the loan. [Sentence explaining rehabilitation plan].";
  }
};

interface LoanStatusTableProps extends HTMLAttributes<HTMLDListElement> {
  data: BuildingInfo;
  lastUpdated: string;
}

// Adapted from DetailRowTable.tsx
export const LoanStatusTable: React.FC<LoanStatusTableProps> = ({
  data,
  lastUpdated,
  className,
  ...props
}) => {
  const [showDesc, setShowDesc] = useState(false);

  const handleRowClick = () => {
    setShowDesc(!showDesc);
  };

  return (
    <DetailTable
      className={classNames(className, "loan-status-table")}
      {...props}
    >
      <div className="detail-table_row">
        <div
          className={
            "detail-table_row_name-value-wrapper" +
            " detail-table_row_name-value-wrapper_has_desc"
          }
          onClick={handleRowClick}
        >
          <dt className="detail-table__name">
            Loan history
            <Icon icon="circleInfo" className="detail-table__name_icon" />
          </dt>
          <dd className="detail-table__value"></dd>
        </div>
        <dd
          className={
            "detail-table__description" +
            (showDesc ? " detail-table__description_open" : "")
          }
        >
          <div className="detail-table__description_content">
            <ul>
              {data.status_info?.statuses?.length &&
                data.status_info.statuses
                  .sort((a, b) => {
                    const dateA = new Date(a.date);
                    const dateB = new Date(b.date);
                    return dateB.getTime() - dateA.getTime();
                  })
                  .map((entry) => {
                    return <li>{loanStatusLabel(entry)}</li>;
                  })}
              <li>Loan originated on {formatDate(data.origination_date)}</li>
            </ul>
            <div className="loan-status-links">
              <JFCLLinkExternal href={data.link_acris}>
                View building page on ACRIS
              </JFCLLinkExternal>
              {data.status_info?.links?.length &&
                data.status_info.links.map((link, i) => {
                  return (
                    <JFCLLinkExternal key={i} href={link.url}>
                      {link.label}
                    </JFCLLinkExternal>
                  );
                })}
            </div>
          </div>

          <span className="last-updated">
            Data last updated {formatLastUpdatedDate(lastUpdated)}
          </span>
        </dd>
      </div>
    </DetailTable>
  );
};
