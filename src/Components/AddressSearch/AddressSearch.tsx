import { useState } from "react";
import Select, {
  ActionMeta,
  InputActionMeta,
  OnChangeValue,
  Props,
} from "react-select";

export type SelectOption = {
  value: string;
  label: string;
};
interface AddressSearchProps extends Props {
  options: SelectOption[];
  onSelection: (newValue: SelectOption) => void;
}

export const AddressSearch: React.FC<AddressSearchProps> = ({
  onChange,
  options,
}) => {
  const [openMenu, setOpenMenu] = useState(false);

  const handleOnChange = (
    newValue: OnChangeValue<SelectOption, false>,
    actionMeta: ActionMeta<SelectOption>
  ) => {
    hideMenu();
    if (onChange) {
      onChange(newValue, actionMeta);
    }
  };

  const handleInputChange: (
    newValue: string,
    actionMeta: InputActionMeta
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
