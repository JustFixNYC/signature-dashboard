import classNames from "classnames";
import { HTMLAttributes, PropsWithChildren } from "react";
import "./style.scss";

interface DetailTableProp extends HTMLAttributes<HTMLDListElement> {
  className?: string;
}

export const DetailTable: React.FC<PropsWithChildren<DetailTableProp>> = ({
  children,
  className,
  ...props
}) => {
  const classes = classNames("detail-table", className);
  return (
    <dl className={classes} {...props}>
      {children}
    </dl>
  );
};
