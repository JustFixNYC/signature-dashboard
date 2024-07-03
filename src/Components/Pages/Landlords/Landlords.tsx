// import { AddressRecord } from "../../types/APIDataTypes";
import React from "react";
import { useSearchParams } from "react-router-dom";
import "./style.scss";
import { Collection } from "../../Collection/Collection";
import { AllLandlords } from "./AllLandlords/AllLandlords";
import AlgoliaSearch from "../../AlgoliaSearch/AlgoliaSearch";

export const Landlords: React.FC = () => {
  const [searchParams] = useSearchParams();
  const landlord = searchParams.get("landlord") || "";

  return (
    <>
      {!landlord && (
        <>
          <AlgoliaSearch />
          <AllLandlords />
        </>
      )}
      {landlord && <Collection collection={landlord} />}
    </>
  );
};
