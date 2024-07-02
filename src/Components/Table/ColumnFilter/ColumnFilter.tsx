import { Checkbox, Icon } from "@justfixnyc/component-library";
import { Table } from "@tanstack/react-table";
import "./style.scss";
import { INDICATOR_STRINGS, apiKeys } from "../../../util/helpers";
import { useEffect, useRef, useState } from "react";

interface ColumnFilter {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  table: Table<any>;
}

export const ColumnFilter: React.FC<ColumnFilter> = ({ table }) => {
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

  return (
    <div className="popover-filter-menu">
      <button
        ref={buttonRef}
        className={`filter-button ${showMenu ? "filter-button--active" : ""}`}
        onClick={onClick}
      >
        Hide Columns (
        {table.getAllLeafColumns().length -
          table.getVisibleLeafColumns().length}
        ) <Icon icon="chevronDown" className="" />
      </button>
      <div
        className={`popover-menu ${showMenu ? "popover-menu--show" : ""}`}
        style={{ top: `${btnHeight + 16}px` }}
        ref={popupRef}
      >
        <div className="popover-menu__header">
          <Checkbox
            labelText="Show all columns"
            id="all"
            value="all"
            checked={table.getIsAllColumnsVisible()}
            onChange={table.getToggleAllColumnsVisibilityHandler()}
          />
        </div>
        <div className="popover-menu__body">
          {table.getAllLeafColumns().map((column) => {
            const indicatorID = column.id as apiKeys;
            const indicatorObj = INDICATOR_STRINGS[indicatorID];
            const labelText = indicatorObj?.name ?? column.id;

            return (
              <Checkbox
                key={column.id}
                labelText={labelText}
                id={column.id}
                checked={column.getIsVisible()}
                onChange={column.getToggleVisibilityHandler()}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
