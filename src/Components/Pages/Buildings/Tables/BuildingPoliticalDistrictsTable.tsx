import { HTMLAttributes } from "react";
import { BuildingInfo } from "../../../../types/APIDataTypes";
import { DetailTable } from "../../../DetailTable/DetailTable";
import { DetailTableRow } from "../../../DetailTable/DetailTableRow";

interface BuildingPoliticalDistrictsTable
  extends HTMLAttributes<HTMLDListElement> {
  data: BuildingInfo;
}

export const BuildingPoliticalDistrictsTable: React.FC<
  BuildingPoliticalDistrictsTable
> = ({ data, ...props }) => {
  return (
    <DetailTable {...props}>
      <DetailTableRow apiKey={"coun_dist"} value={data["coun_dist"]} />
      <DetailTableRow apiKey={"assem_dist"} value={data["assem_dist"]} />
      <DetailTableRow apiKey={"stsen_dist"} value={data["stsen_dist"]} />
      <DetailTableRow apiKey={"cong_dist"} value={data["cong_dist"]} />
    </DetailTable>
  );
};
