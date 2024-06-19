// import { AddressRecord } from "../../types/APIDataTypes";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import { AddressSearch } from "../../AddressSearch/AddressSearch";
import selectOptions from "./buildings_options.json";

export const NoBBL: React.FC = () => {
  const navigate = useNavigate();
  const onSelection = (newValue: string | null) => {
    if (newValue) {
      navigate(`/buildings?bbl=${newValue}`);
    }
  };

  return (
    <>
      <h2>Buildings</h2>
      Search for a building by address
      <br />
      <br />
      <AddressSearch options={selectOptions} onSelection={onSelection} />
    </>
  );
};
