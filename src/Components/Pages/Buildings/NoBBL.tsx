// import { AddressRecord } from "../../types/APIDataTypes";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AddressSearch, SelectOption } from "../../AddressSearch/AddressSearch";
import selectOptions from "./buildings_options.json";
import "./style.scss";
import { PageTitle } from "../../PageTitle/PageTitle";
import { BuildingTable } from "../../BuildingTable/BuildingTable";
import { useGetCollectionInfo } from "../../../api/hooks";

export const NoBBL: React.FC = () => {
  const navigate = useNavigate();

  const { data, error, isLoading } = useGetCollectionInfo("all");

  const onSelection = (newValue: SelectOption | null) => {
    if (newValue) {
      navigate(`/buildings?bbl=${newValue.value}`);
    }
  };

  return (
    <>
      <PageTitle>Buildings</PageTitle>

      <div style={{ width: "fit-content" }}>
        Find a building in the Signature portfolio by entering the address
        <br />
        <br />
        <AddressSearch options={selectOptions} onSelection={onSelection} />
        <br />
      </div>
      {isLoading && <div>loading...</div>}
      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
      {data && (
        <BuildingTable data={data.bldg_data} pagination={true} pageSize={100} />
      )}
    </>
  );
};
