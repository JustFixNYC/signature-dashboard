// import { AddressRecord } from "../../types/APIDataTypes";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AddressSearch, SelectOption } from "../../AddressSearch/AddressSearch";
import selectOptions from "./buildings_options.json";
import "./style.scss";
import { PageTitle } from "../../PageTitle/PageTitle";

export const NoBBL: React.FC = () => {
  const navigate = useNavigate();

  const onSelection = (newValue: SelectOption | null) => {
    if (newValue) {
      navigate(`/buildings?bbl=${newValue.value}`);
    }
  };

  return (
    <>
      <PageTitle>Buildings</PageTitle>
      Find a building by entering the address
      <br />
      <br />
      <AddressSearch options={selectOptions} onSelection={onSelection} />
    </>
  );
};
