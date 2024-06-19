import { HTMLAttributes } from "react";
import { BuildingInfo } from "../../../../types/APIDataTypes";
import { DetailTable } from "../../../DetailTable/DetailTable";
import { DetailTableRow } from "../../../DetailTable/DetailTableRow";

interface BuildingInformationTable extends HTMLAttributes<HTMLDListElement> {
  data: BuildingInfo;
}

export const BuildingInformationTable: React.FC<BuildingInformationTable> = ({
  data,
  ...props
}) => {
  return (
    <DetailTable {...props}>
      <DetailTableRow apiKey={"rs_units"} value={data["rs_units"]} />
      <DetailTableRow apiKey={"units_res"} value={data["units_res"]} />
      <DetailTableRow apiKey={"units_nonres"} value={data["units_nonres"]} />
      <DetailTableRow apiKey={"year_built"} value={data["year_built"]} />
      <DetailTableRow apiKey={"bip"} value={data["bip"]} />
    </DetailTable>
  );
};
