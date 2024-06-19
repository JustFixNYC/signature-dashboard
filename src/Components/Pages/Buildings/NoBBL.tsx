// import { AddressRecord } from "../../types/APIDataTypes";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllBBLs } from "../../../api/hooks";
// import { BuildingHPDCompEmerg } from "../BuildingHPDCompEmerg/BuildingHPDCompEmerg";
import { Button } from "@justfixnyc/component-library";
import "./style.scss";
import GeoAddressSearch, {
  SearchAddress,
} from "../../AddressSearch/GeoAddressSearch";
import { AddressSearch, SelectOption } from "../../AddressSearch/AddressSearch";
import selectOptions from "./buildings_options.json";

export const NoBBL: React.FC = () => {
  const navigate = useNavigate();
  const [selectedBBL, setSelectedBBL] = useState<string>();

  const { data, isLoading, error } = useGetAllBBLs();

  const onFormSubmit: (
    searchAddress: SearchAddress,
    error: unknown,
  ) => void = ({ bbl }) => {
    navigate(`/buildings?bbl=${bbl}`);
  };
  const onSelection = (newValue: SelectOption) => {
    console.log(newValue);
    setSelectedBBL(newValue.value);
  };

  const onSubmit = () => {
    navigate(`/buildings?bbl=${selectedBBL}`);
  };

  return (
    <>
      <h2>Buildings</h2>
      Search for a building by address (Pre-filtered local list)
      <br />
      <br />
      <AddressSearch options={selectOptions} onSelection={onSelection} />
      <br />
      <Button labelText="Search Building" size="small" onClick={onSubmit} />
      <br />
      <br />
      <br />
      Search for a building by address (using the city's api and filtering results)
      <br />
      <br />
      {isLoading && <div>loading...</div>}
      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
      {data && (
        <>
          <GeoAddressSearch
            onFormSubmit={onFormSubmit}
            labelText=""
            labelClass={""}
            bbls={data}
          />
          <Button labelText="Search Building" size="small" />
        </>
      )}
    </>
  );
};
