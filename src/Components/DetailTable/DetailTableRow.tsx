import { Icon } from "@justfixnyc/component-library";
import { useState } from "react";

type DetailTableRowProps = {
  name: string;
  value: string | number | boolean;
  description?: string;
};

export const DetailTableRow: React.FC<DetailTableRowProps> = ({
  name,
  value,
  description,
}) => {
  const [showDesc, setShowDesc] = useState(false);

  const handleRowClick = () => {
    setShowDesc(!showDesc);
  };

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
            <Icon
              icon="circleExclamation"
              className="detail-table__name_icon"
            />
          )}
        </dt>
        <dd className="detail-table__value">{value}</dd>
      </div>
      <dd
        className={
          "detail-table__description" +
          (showDesc ? " detail-table__description_open" : "")
        }
      >
        {description}
      </dd>
    </div>
  );
};
