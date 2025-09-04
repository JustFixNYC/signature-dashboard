import { Pill, PillColors } from "./Pill";
import { LoanAction } from "../../types/APIDataTypes";
import { loanStatusLabel } from "../LoanStatusTable/LoanStatusTable";

const STATUS_COLORS: {
  [K in LoanAction]: PillColors;
} = {
  satisfied: "red",
  sold_market: "red",
  sold_preservation: "red",
  sold_foreclosure: "red",
  foreclosure_active: "pink",
  foreclosure_settled: "yellow",
  loan_modified: "blue",
  reo: "green",
  no_action: "grey",
};

export const LoanStatusPill: React.FC<{
  status: LoanAction
}> = ({ status }) => {
  const color = STATUS_COLORS[status];
  const label = loanStatusLabel(status);
  return (
    <Pill className="pill-loan-status" color={color}>
      {label}
    </Pill>
  );
};
