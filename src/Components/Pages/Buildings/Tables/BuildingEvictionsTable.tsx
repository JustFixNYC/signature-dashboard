import { HTMLAttributes } from "react";
import { BuildingInfo } from "../../../../types/APIDataTypes";
import { DetailTable } from "../../../DetailTable/DetailTable";
import { DetailTableRow } from "../../../DetailTable/DetailTableRow";

interface BuildingEvictionsTable extends HTMLAttributes<HTMLDListElement> {
  data: BuildingInfo;
}

export const BuildingEvictionsTable: React.FC<BuildingEvictionsTable> = ({
  data,
  ...props
}) => {
  return (
    <DetailTable {...props}>
      <DetailTableRow
        apiKey={"evictions_filed"}
        value={data["evictions_filed"]}
      />
      <DetailTableRow
        apiKey={"evictions_executed"}
        value={data["evictions_executed"]}
      />
    </DetailTable>
  );
};
