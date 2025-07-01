import { HTMLAttributes } from "react";
import {
  BuildingInfo,
  DatasetLastUpdatedData,
} from "../../../../types/APIDataTypes";
import { DetailTable } from "../../../DetailTable/DetailTable";
import { DetailTableRow } from "../../../DetailTable/DetailTableRow";
import classNames from "classnames";

interface BuildingDetailTable extends HTMLAttributes<HTMLDListElement> {
  data: BuildingInfo;
  lastUpdatedData: DatasetLastUpdatedData[];
  indicators: (keyof Omit<BuildingInfo, "status_info">)[];
  className?: string;
}

export const BuildingDetailTable: React.FC<BuildingDetailTable> = ({
  data,
  lastUpdatedData,
  indicators,
  className,
  ...props
}) => {
  return (
    <DetailTable
      className={classNames("building-detail-table", className)}
      {...props}
    >
      {indicators.map((indicator, i) => (
        <DetailTableRow
          apiKey={indicator}
          value={
            indicator === "rs_units" && data[indicator] === 0
              ? "0*"
              : data[indicator]
          }
          lastUpdatedData={lastUpdatedData}
          key={i}
        />
      ))}
    </DetailTable>
  );
};
