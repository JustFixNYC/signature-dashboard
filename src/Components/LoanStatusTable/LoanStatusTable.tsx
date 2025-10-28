import { HTMLAttributes, useState } from "react";
import classNames from "classnames";
import { Icon } from "@justfixnyc/component-library";
import { DetailTable } from "../DetailTable/DetailTable";
import { formatDate, formatLastUpdatedDate } from "../../util/helpers";
import {
  BuildingInfo,
  DatasetLastUpdatedData,
  LoanAction,
} from "../../types/APIDataTypes";
import JFCLLinkExternal from "../JFCLLinkExternal";

import "./LoanStatusTable.scss";

export const loanDescription = (data: BuildingInfo) => {
  switch (data.latest_action) {
    case "satisfied":
      return `The building is no longer a part of the joint venture. The loan has been satisfied. The building may have a loan with a different lender or no longer have a loan.`;
    case "sold_market":
      return `The building is no longer a part of the joint venture. This building was sold out by ${data.loan_pool} through a market sale. `;
    case "sold_preservation":
      return `The building is no longer a part of the joint venture. This building was sold by ${data.loan_pool} through a preservation sale. `;
    case "sold_foreclosure":
      return `The building is no longer a part of the joint venture. This building was sold out at a foreclosure sale to a third party bidder.`;
    case "foreclosure_active":
      return `This building has an active foreclosure filing. `;
    case "foreclosure_settled":
      return `This building is no longer in an active foreclosure case.`;
    case "loan_modified":
      return `${data.loan_pool} has modified this loan using a note splitter. A loan modification involving a note splitter divides the loan into multiple, separate notes which can be thought of as subloans. These notes that are categorized as A-notes and B-notes. A-notes are prioritized for payment. No new debt is created through this loan modification but the terms of payment change.`;
    case "reo":
      return `${data.loan_pool} has acquired this building.${data.loan_pool === "CPC" ? " As per the joint venture agreement CPC is required to hold this property until 2029." : ""}`;
  }
};

export const loanStatusLabel = (status: LoanAction) => {
  switch (status) {
    case "no_action":
      return "No Known Action Taken";
    case "satisfied":
      return "No Longer in Portfolio";
    case "sold_market":
      return "No Longer in Portfolio";
    case "sold_preservation":
      return "No Longer in Portfolio";
    case "sold_foreclosure":
      return "No Longer in Portfolio";
    case "foreclosure_active":
      return "In Foreclosure";
    case "foreclosure_settled":
      return "Foreclosure Settled";
    case "loan_modified":
      return "Loan Modification Involving a Note Splitter";
    case "reo":
      return "Real Estate Owned (REO)";
  }
};

const LoanHistorySection: React.FC<BuildingInfo> = ({
  origination_date,
  loan_info: loanInfo,
}) => {
  if (!origination_date)
    return <>The loan history for this property is unavailable.</>;

  const originationAction = [
    `Loan originated on ${formatDate(origination_date)}`,
  ];

  let historyActions = [];
  if (!loanInfo) {
    historyActions = originationAction;
  } else {
    historyActions = loanInfo.actions
      .sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
      })
      .map((entry) => {
        switch (entry.action) {
          case "no_action":
            return "There has been no publicly recorded action taken on the loan of this building.";
          case "satisfied":
            return `Satisfied on ${formatDate(entry.date)}`;
          case "sold_market":
            return `Sold on the market out of REO on ${formatDate(entry.date)}`;
          case "sold_preservation":
            return `Sold to preservation buyer out of REO on ${formatDate(entry.date)}`;
          case "sold_foreclosure":
            return `Sold to third party bidder at foreclosure sale on ${formatDate(entry.date)}`;
          case "foreclosure_active":
            return `Foreclosure was filed on ${formatDate(entry.date)}`;
          case "foreclosure_settled":
            return `Foreclosure was settled on ${formatDate(entry.date)}`;
          case "loan_modified":
            return `The loan for building was modified on ${formatDate(entry.date)}`;
          case "reo":
            return `Real estate owned (REO) as of ${formatDate(entry.date)}`;
        }
      })
      .filter((x) => x !== undefined)
      .concat(originationAction);
  }

  return (
    <ul>
      {historyActions.map((text, index) => (
        <li key={index}>{text}</li>
      ))}
    </ul>
  );
};

interface LoanStatusTableProps extends HTMLAttributes<HTMLDListElement> {
  data: BuildingInfo;
  lastUpdatedData?: DatasetLastUpdatedData[];
}

// Adapted from DetailRowTable.tsx
export const LoanStatusTable: React.FC<LoanStatusTableProps> = ({
  data,
  lastUpdatedData,
  className,
  ...props
}) => {
  const [showDesc, setShowDesc] = useState(false);

  const handleRowClick = () => {
    setShowDesc(!showDesc);
  };

  // NOTE: This "unhp" record in our database table
  // "nycdb_k8s_loader.dataset_tracker" is updated manually, unlike other
  // datasets updated as part of the k8s-loader job, so whenever we get a new
  // set of data files from UNHP we need to go in an manually update the date
  // (eg. via postico).
  const lastUpdated = lastUpdatedData?.find(
    (x) => x.dataset === "unhp",
  )?.last_updated;

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
            <LoanHistorySection {...data} />
            <div className="loan-status-links">
              <JFCLLinkExternal href={data.link_acris}>
                View building page on ACRIS
              </JFCLLinkExternal>
              {data.loan_info?.links?.length &&
                data.loan_info.links.map((link, i) => {
                  return (
                    <JFCLLinkExternal key={i} href={link.url}>
                      {link.label}
                    </JFCLLinkExternal>
                  );
                })}
            </div>
          </div>
          {lastUpdated && (
            <span className="last-updated">
              Data last updated {formatLastUpdatedDate(lastUpdated)}
            </span>
          )}
        </dd>
      </div>
    </DetailTable>
  );
};
