// import { AddressRecord } from "../../types/APIDataTypes";
import React from "react";
import "./style.scss";
import { PageTitle } from "../../PageTitle/PageTitle";

export const Map: React.FC = () => {
  return (
    <>
      <PageTitle>Map</PageTitle>

      <div style={{ width: "600px" }}>
        <p>
          This page will have a map of all buildings in the Signature Bank
          portfolio
        </p>
      </div>
    </>
  );
};
