import { Icon } from "@justfixnyc/component-library";
import { HTMLAttributes, useState } from "react";
import {
  apiKeys,
  formatDate,
  formatLastUpdatedDate,
  formatMoney,
  formatNumber,
  formatNumberNoComma,
  formatPercent,
  showYesNo,
} from "../../util/helpers";
import { INDICATOR_STRINGS } from "../../util/indicators";
import { DatasetLastUpdatedData } from "../../types/APIDataTypes";
import { Pill } from "../Pill/Pill";

interface DetailTableRowProps extends HTMLAttributes<HTMLDivElement> {
  apiKey: apiKeys;
  value: string | number | boolean;
  lastUpdatedData?: DatasetLastUpdatedData[];
}

export const DetailTableRow: React.FC<DetailTableRowProps> = ({
  apiKey,
  value,
  lastUpdatedData,
  ...props
}) => {
  const [showDesc, setShowDesc] = useState(false);

  const handleRowClick = () => {
    setShowDesc(!showDesc);
  };

  const indicator = INDICATOR_STRINGS[apiKey];

  const name = indicator ? indicator.name : apiKey;
  const description = indicator?.description;
  const lastUpdated = lastUpdatedData?.find(
    (x) => x.dataset === indicator?.dataset
  )?.last_updated;

  let displayValue: React.ReactNode = value;

  if (indicator?.format === "round" && typeof value === "number") {
    displayValue = value.toFixed(2);
  }

  if (indicator?.format === "money" && typeof value === "number") {
    displayValue = <>{formatMoney(value)}</>;
  }

  if (indicator?.format === "percent" && typeof value === "number") {
    displayValue = formatPercent(value);
  }

  if (indicator?.format === "boolean" && typeof value === "boolean") {
    if (value)
      displayValue = (
        <Pill color="grey">
          <Icon icon="check" className="pill__icon_check" />
          {showYesNo(value)}
        </Pill>
      );
    else
      displayValue = (
        <Pill color="grey">
          <Icon icon="ban" className="pill__icon_ban" />
          {showYesNo(value)}
        </Pill>
      );
  }

  if (indicator?.format === "comma" && typeof value === "number") {
    displayValue = formatNumber(value) as string;
  }

  if (indicator?.format === "date" && typeof value === "string") {
    displayValue = formatDate(value) as string;
  }

  if (typeof indicator?.format === "undefined" && typeof value === "number") {
    displayValue = formatNumberNoComma(value);
  }

  if (apiKey === "bip" && typeof value === "number") {
    displayValue = (
      <Pill color={value < 500 ? "grey" : value < 800 ? "yellow" : "orange"}>
        <>{displayValue}</>
      </Pill>
    );
  }

  return (
    <div className="detail-table_row" {...props}>
      <div
        className={
          "detail-table_row_name-value-wrapper" +
          (description ? " detail-table_row_name-value-wrapper_has_desc" : "")
        }
        onClick={description ? handleRowClick : undefined}
      >
        <dt className="detail-table__name">
          {name}
          {description && (
            <Icon icon="circleInfo" className="detail-table__name_icon" />
          )}
        </dt>
        <dd className="detail-table__value">
          <>{displayValue}</>
        </dd>
      </div>
      <dd
        className={
          "detail-table__description" +
          (showDesc ? " detail-table__description_open" : "")
        }
      >
        <div className="detail-table__description_content">{description}</div>

        {lastUpdated && (
          <span className="last-updated">
            Last updated {formatLastUpdatedDate(lastUpdated)}
          </span>
        )}
      </dd>
    </div>
  );
};
