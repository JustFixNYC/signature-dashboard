import { Icon } from "@justfixnyc/component-library";
import classNames from "classnames";
import "./style.scss";
import React, { LegacyRef } from "react";

type FilterChipProps = {
  labelText: string;
  removable?: boolean;
  selected?: boolean;
  variant?: "primary" | "secondary"; // To be used in the future when migrated to component library
  className?: string;
  onClick?: () => void;
  ref: LegacyRef<HTMLDivElement> | undefined;
};

export const FilterChip = React.forwardRef<HTMLDivElement, FilterChipProps>(
  (
    { labelText, removable, selected, variant = "primary", onClick, className },
    ref
  ) => {
    const filterChipClassNames = classNames(
      "jfcl-filter-chip",
      `jfcl-variant-${variant}`,
      {
        ["jfcl-filter-chip--is-selected"]: selected,
      },
      className
    );
    return (
      <div
        className={filterChipClassNames}
        {...(onClick && { onClick: onClick })}
        ref={ref}
      >
        <span className="jfcl-filter-chip__text">{labelText}</span>
        {removable && (
          <span className="jfcl-filter-chip__icon_remove">
            <Icon icon="xmark" />
          </span>
        )}
      </div>
    );
  }
);
