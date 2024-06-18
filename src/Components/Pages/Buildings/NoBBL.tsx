// import { AddressRecord } from "../../types/APIDataTypes";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllBBLs } from "../../../api/hooks";
// import { BuildingHPDCompEmerg } from "../BuildingHPDCompEmerg/BuildingHPDCompEmerg";
import { Button } from "@justfixnyc/component-library";
import "./style.scss";
import AddressSearch, {
  SearchAddress,
} from "../../AddressSearch/AddressSearch";

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
      {isLoading && <div>loading...</div>}
      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
      {data && (
        <>
          <AddressSearch
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
