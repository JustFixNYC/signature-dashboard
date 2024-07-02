// import { AddressRecord } from "../../types/APIDataTypes";
import React from "react";
import "./style.scss";
import { AddressSearch, SelectOption } from "../../AddressSearch/AddressSearch";

import selectOptions from "../Buildings/buildings_options.json";
import { useNavigate } from "react-router-dom";
import { PageTitle } from "../../PageTitle/PageTitle";
import JFCLLinkInternal from "../../JFCLLinkInternal";

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const onSelection = (newValue: SelectOption | null) => {
    if (newValue) {
      navigate(`/buildings?bbl=${newValue.value}`);
    }
  };
  return (
    <>
      <PageTitle>Home</PageTitle>
      <p style={{ width: "600px" }}>
        This project is a collaboration between JustFix and UNHP to track
        available public data on the rent-regulated portion of the former
        Signature Bank multifamily loan portfolio.
      </p>
      <div style={{ width: "fit-content" }}>
        Find a building in the Signature portfolio by entering the address
        <br />
        <br />
        <AddressSearch options={selectOptions} onSelection={onSelection} />
        <br />
        <JFCLLinkInternal href="/entire-portfolio">
          Entire Signature Portfolio
        </JFCLLinkInternal>
      </div>
    </>
  );
};
