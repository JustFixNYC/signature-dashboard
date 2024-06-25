import Select, { OnChangeValue, Props } from "react-select";

export type SelectOption = {
  value: string;
  label: string;
};
interface AddressSearchProps extends Props {
  options: SelectOption[];
  onSelection: (newValue: OnChangeValue<SelectOption, false>) => void;
}

export const AddressSearch: React.FC<AddressSearchProps> = ({
  onSelection,
  options,
}) => {
  return (
    <Select
      options={options}
      placeholder={"Select address..."}
      noOptionsMessage={() => "No match found in Signature portfolio"}
      onChange={onSelection}
    />
  );
};
