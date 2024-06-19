import { useState } from "react";
import Select, { InputActionMeta, OnChangeValue, Props } from "react-select";

export type SelectOption = {
  value: string;
  label: string;
};
interface AddressSearchProps extends Props {
  options: SelectOption[];
  onSelection: (newValue: string | null) => void;
}

export const AddressSearch: React.FC<AddressSearchProps> = ({
  onSelection,
  options,
}) => {
  const [openMenu, setOpenMenu] = useState(false);

  const handleOnChange = (newValue: OnChangeValue<SelectOption, false>) => {
    hideMenu();
    if (onSelection) {
      onSelection(newValue ? newValue.value : null);
    }
  };

  const handleInputChange: (
    newValue: string,
    actionMeta: InputActionMeta,
  ) => void = (_query, { action }) => {
    if (action === "input-change") {
      setOpenMenu(true);
    }
  };

  const hideMenu = () => {
    setOpenMenu(false);
  };

  return (
    <Select
      options={options}
      placeholder={"Select address..."}
      noOptionsMessage={() => "No match"}
      onChange={handleOnChange}
      menuIsOpen={openMenu}
      onInputChange={handleInputChange}
      onBlur={hideMenu}
      components={{
        IndicatorSeparator: () => null,
        DropdownIndicator: () => null,
      }}
    />
  );
};
