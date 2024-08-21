import { Button, Checkbox } from "@justfixnyc/component-library";
import { Table } from "@tanstack/react-table";
import "./style.scss";
import { apiKeys } from "../../../util/helpers";
import { INDICATOR_STRINGS } from "../../../util/indicators";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { gtmPush } from "../../../google-tag-manager";
import { useAuth } from "../../../auth";

interface ColumnFilter {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  table: Table<any>;
}

export const ColumnFilter: React.FC<ColumnFilter> = ({ table }) => {
  const { user } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  const handleClickOutside = (e: MouseEvent) => {
    if (
      popupRef.current &&
      !popupRef.current.contains(e.target as HTMLElement) &&
      !buttonRef.current?.contains(e.target as HTMLElement)
    ) {
      setShowMenu(false);
    }
  };

  const onClick = () => {
    setShowMenu(!showMenu);
  };

  const btnHeight = buttonRef.current?.offsetHeight ?? 0;

  const numHiddenColumn =
    table.getAllLeafColumns().length - table.getVisibleLeafColumns().length;
  const hasHiddenColumns = numHiddenColumn > 0;
  const buttonClassNames = classNames("filter-button", {
    "filter-button--has-hidden": numHiddenColumn > 0,
  });

  const clearButtonLabel = hasHiddenColumns
    ? numHiddenColumn === 1
      ? `1 Hidden Column`
      : `${numHiddenColumn} Hidden Columns`
    : "Hide Columns";

  return (
    <div className="popover-filter-menu">
      <Button
        ref={buttonRef}
        className={buttonClassNames}
        onClick={onClick}
        labelText={clearButtonLabel}
        variant="secondary"
        size="small"
        iconOnRight={false}
        labelIcon="eyeSlash"
      />
      <div
        className={`popover-menu ${showMenu ? "popover-menu--show" : ""}`}
        style={{ top: `${btnHeight + 12}px` }}
        ref={popupRef}
      >
        <div className="popover-menu__scroll-area">
          <div className="popover-menu__header">
            <Checkbox
              labelText="All columns"
              id="all"
              value="all"
              checked={table.getIsAllColumnsVisible()}
              onChange={table.getToggleAllColumnsVisibilityHandler()}
            />
          </div>
          <div className="popover-menu__body">
            {table
              .getAllLeafColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                const indicatorID = column.id as apiKeys;
                const indicatorObj = INDICATOR_STRINGS[indicatorID];
                const labelText = indicatorObj?.name ?? column.id;

                return (
                  <Checkbox
                    key={column.id}
                    labelText={labelText}
                    id={column.id}
                    checked={column.getIsVisible()}
                    onChange={(e) => {
                      column.getToggleVisibilityHandler()(e);
                      gtmPush("sig_table_visible", {
                        user_type: user,
                        column: column.id,
                        type: column.getIsVisible() ? "hide" : "show",
                      });
                    }}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
