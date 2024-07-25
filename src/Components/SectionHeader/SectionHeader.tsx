import classNames from "classnames";
import "./style.scss";

type SectionHeaderProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
};

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  children,
  id,
  className,
}) => {
  const classes = classNames("section-header", className);
  return (
    <h3 id={id} className={classes}>
      {children}
    </h3>
  );
};

export const SubSectionHeader: React.FC<SectionHeaderProps> = ({
  children,
  id,
  className,
}) => {
  const classes = classNames("subsection-header", className);
  return (
    <h4 id={id} className={classes}>
      {children}
    </h4>
  );
};
