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
      <PageTitle>Signature Portfolio Dashboard</PageTitle>
      <div style={{ width: "568px" }}>
        <p>
          This project is a collaboration between JustFix and UNHP to track
          available public data on the rent-regulated portion of the former
          Signature Bank multifamily loan portfolio.
        </p>

        <div style={{ width: "fit-content" }}>
          <h3 className="homepage-section-header">Search building</h3>
          <p className="homepage-copy">
            Find a building in the Signature portfolio by entering the address
          </p>
          <AddressSearch
            options={selectOptions}
            onSelection={onSelection}
          />
          <h3 className="homepage-section-header">
            Learn about the entire Signature Portfolio
          </h3>
          <p className="homepage-copy">
            See aggregate stats on all 1,650 buildings on the dashboard. View
            entire Signature Portfolio
          </p>
          <JFCLLinkInternal href="/entire-portfolio">
            Entire Signature Portfolio
          </JFCLLinkInternal>
        </div>
      </div>
    </>
  );
};
