import { Pill } from "./Pill";
import { formatNumber } from "../../util/helpers";

type BIPPillProps = {
  value: number;
};

export const BIPPill: React.FC<BIPPillProps> = ({ value }) => {
  const color = value < 500 ? "grey" : value < 800 ? "yellow" : "orange";
  return value < 500 ? (
    <>{formatNumber(value)}</>
  ) : (
    <Pill color={color}>
      <>{formatNumber(value)}</>
    </Pill>
  );
};
