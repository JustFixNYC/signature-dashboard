import { ReactNode } from "react";
import "./style.scss";
import classNames from "classnames";

export type PillColors = "yellow" | "orange" | "grey" | "red" | "blue" | "green" | "pink";

type PillProps = {
  children: ReactNode;
  color: PillColors;
  className?: string;
};

export const Pill: React.FC<PillProps> = ({ color, children, className }) => (
  <div className={classNames(`pill pill-${color}`, className)}>{children}</div>
);
