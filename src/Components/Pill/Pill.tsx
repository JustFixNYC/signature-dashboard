import { ReactNode } from "react";
import "./style.scss";

export type PillColors = "yellow" | "orange" | "grey";

type PillProps = {
  children: ReactNode;
  color: PillColors;
};

export const Pill: React.FC<PillProps> = ({ color, children }) => {
  return <div className={`pill pill-${color}`}>{children}</div>;
};
