import classNames from "classnames";
import "./style.scss";

type SectionSubtitleProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
};

export const SectionSubtitle: React.FC<SectionSubtitleProps> = ({
  children,
  className,
}) => {
  const classes = classNames("section-subtitle", className);
  return <p className={classes}>{children}</p>;
};
