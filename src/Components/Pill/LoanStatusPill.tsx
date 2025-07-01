import { Pill, PillColors } from "./Pill";
import { LoanStatus } from "../../types/APIDataTypes";

type LoanStatusPillProps = {
  status: LoanStatus;
};

const STATUS_COLORS: {
  [K in LoanStatus]: PillColors;
} = {
  pending: "grey",
  left_program: "red",
  foreclosure: "yellow",
  refinanced: "blue",
  write_down: "blue",
  rehab: "blue",
  write_down_rehab: "blue",
};

const STATUS_LABEL: {
  [K in LoanStatus]: string;
} = {
  pending: "Awaiting negotiation",
  left_program: "No longer in program",
  foreclosure: "In foreclosure",
  refinanced: "Refinanced",
  write_down: "Refinanced",
  rehab: "Refinanced",
  write_down_rehab: "Refinanced",
};

export const getLoanStatusLabel = (status: LoanStatus): string =>
  STATUS_LABEL[status];

export const LoanStatusPill: React.FC<LoanStatusPillProps> = ({ status }) => {
  const color = STATUS_COLORS[status];
  const label = STATUS_LABEL[status];
  // TODO: might need to have an option for wrapped text with </br> to get the
  // padding/width correct in table cell. waiting for everything else to be
  // finalized before returning to this
  return (
    <Pill className="pill-loan-status" color={color}>
      {label}
    </Pill>
  );
};
