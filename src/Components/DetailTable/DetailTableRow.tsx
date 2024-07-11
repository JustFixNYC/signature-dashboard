import { Icon } from "@justfixnyc/component-library";
import { useState } from "react";
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

type DetailTableRowProps = {
  apiKey: apiKeys;
  value: string | number | boolean;
  lastUpdatedData?: DatasetLastUpdatedData[];
};

export const DetailTableRow: React.FC<DetailTableRowProps> = ({
  apiKey,
  value,
  lastUpdatedData,
}) => {
  const [showDesc, setShowDesc] = useState(false);

  const handleRowClick = () => {
    setShowDesc(!showDesc);
  };
  console.log(lastUpdatedData);

  const indicator = INDICATOR_STRINGS[apiKey];

  const name = indicator ? indicator.name : apiKey;
  const description = indicator?.description;
  const lastUpdated = lastUpdatedData?.find(
    (x) => x.dataset === indicator?.dataset
  )?.last_updated;

  let displayValue: unknown = value;

  if (indicator?.format === "round" && typeof value === "number") {
    displayValue = value.toFixed(2);
  }

  if (indicator?.format === "money" && typeof value === "number") {
    displayValue = formatMoney(value);
  }

  if (indicator?.format === "percent" && typeof value === "number") {
    displayValue = formatPercent(value);
  }

  if (indicator?.format === "boolean" && typeof value === "boolean") {
    displayValue = showYesNo(value) as string;
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


  return (
    <div className="detail-table_row">
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
        {description}

        {lastUpdated && (
          <>
            <br />
            <span className="last-updated">
              Last updated {formatLastUpdatedDate(lastUpdated)}.
            </span>
          </>
        )}
      </dd>
    </div>
  );
};
