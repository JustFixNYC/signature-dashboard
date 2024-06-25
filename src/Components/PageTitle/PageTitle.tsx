import { ReactNode } from "react";
import "./style.scss";

interface PageTitleProps {
  children: ReactNode;
  className?: string;
}

export const PageTitle: React.FC<PageTitleProps> = ({
  children,
  className,
}) => {
  const classString = `page-title ${className ?? ""}`;

  return <h2 className={classString}>{children}</h2>;
};
