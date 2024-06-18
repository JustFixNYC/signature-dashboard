import { HTMLAttributes } from "react";
import { BuildingInfo } from "../../../../types/APIDataTypes";
import { DetailTable } from "../../../DetailTable/DetailTable";
import { DetailTableRow } from "../../../DetailTable/DetailTableRow";

interface BuildingBIPTable extends HTMLAttributes<HTMLDListElement> {
  data: BuildingInfo;
}

export const BuildingBIPTable: React.FC<BuildingBIPTable> = ({
  data,
  ...props
}) => {
  return (
    <DetailTable {...props}>
      <DetailTableRow apiKey={"bip"} value={data["bip"]} />
    </DetailTable>
  );
};
