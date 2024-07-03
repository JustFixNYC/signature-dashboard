import React from "react";
import { PageTitle } from "../../PageTitle/PageTitle";
import { AddressSearch } from "../../AlgoliaSearch/AlgoliaSearch";
import "./style.scss";

export const NoBBL: React.FC = () => {
  return (
    <>
      <PageTitle>Buildings</PageTitle>

      <div style={{ width: "fit-content" }}>
        <AddressSearch labelText="Find a building in the Signature portfolio by entering the address" />
      </div>
    </>
  );
};
