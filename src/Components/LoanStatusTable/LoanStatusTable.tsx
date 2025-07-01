import { HTMLAttributes, useState } from "react";
import classNames from "classnames";
import { Icon } from "@justfixnyc/component-library";
import { DetailTable } from "../DetailTable/DetailTable";
import { formatDate, formatLastUpdatedDate } from "../../util/helpers";
import { BuildingInfo, LoanStatus } from "../../types/APIDataTypes";
import JFCLLinkExternal from "../JFCLLinkExternal";

import "./LoanStatusTable.scss";

// Adapted from DetailRowTable.tsx

const LOAN_STATUS_LABELS: { [K in Exclude<LoanStatus, "pending">]: string } = {
  left_program: "Satisfied",
  foreclosure: "Foreclosure began",
  refinanced: "Refinanced",
  write_down: "Refinanced",
  rehab: "Refinanced",
  write_down_rehab: "Refinanced",
};

interface LoanStatusTableProps extends HTMLAttributes<HTMLDListElement> {
  data: BuildingInfo;
  lastUpdated: string;
}

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
            Loan history from ACRIS
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
                    return (
                      <li>
                        {LOAN_STATUS_LABELS[entry.status]} on{" "}
                        {formatDate(entry.date)}
                      </li>
                    );
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
