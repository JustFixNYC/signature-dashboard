// import { AddressRecord } from "../../types/APIDataTypes";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AddressSearch, SelectOption } from "../../AddressSearch/AddressSearch";
import selectOptions from "./buildings_options.json";
import "./style.scss";

export const NoBBL: React.FC = () => {
  const navigate = useNavigate();

  const onSelection = (newValue: SelectOption | null) => {
    if (newValue) {
      navigate(`/buildings?bbl=${newValue.value}`);
    }
  };

  return (
    <>
      <h2>Buildings</h2>
      Find a building by entering the address
      <br />
      <br />
      <AddressSearch options={selectOptions} onSelection={onSelection} />
    </>
  );
};
