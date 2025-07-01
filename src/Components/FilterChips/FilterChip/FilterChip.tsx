import { Icon } from "@justfixnyc/component-library";
import classNames from "classnames";
import "./style.scss";

type FilterChipProps = {
  labelText: string;
  removable?: boolean;
  selected?: boolean;
  variant?: "primary" | "secondary"; // To be used in the future when migrated to component library
  className?: string;
  onClick?: () => void;
};

export const FilterChip: React.FC<FilterChipProps> = ({
  labelText,
  removable,
  selected,
  variant = "primary",
  onClick,
  className,
}) => {
  const filterChipClassNames = classNames(
    "jfcl-filter-chip",
    `jfcl-variant-${variant}`,
    {
      ["jfcl-filter-chip--is-selected"]: selected,
    },
    className,
  );
  return (
    <div
      className={filterChipClassNames}
      {...(onClick && { onClick: onClick })}
    >
      <span className="jfcl-filter-chip__text">{labelText}</span>
      {removable && (
        <span className="jfcl-filter-chip__icon_remove">
          <Icon icon="xmark" />
        </span>
      )}
    </div>
  );
};
