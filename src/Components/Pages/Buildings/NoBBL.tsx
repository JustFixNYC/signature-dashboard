// import { AddressRecord } from "../../types/APIDataTypes";
import React from "react";
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
  const { data, isLoading, error } = useGetAllBBLs();

  const onFormSubmit: (
    searchAddress: SearchAddress,
    error: unknown,
  ) => void = ({ bbl }) => {
    navigate(`/buildings?bbl=${bbl}`);
  };

  return (
    <>
      <h2>Buildings</h2>
      Search for a building by address

      <br />
      <br />
      <br />
      Search for a building by address
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
