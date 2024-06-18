// import { AddressRecord } from "../../types/APIDataTypes";
import React from "react";
import { useSearchParams } from "react-router-dom";
import "./style.scss";
import { Collection } from "../../Collection/Collection";

export const Landlords: React.FC = () => {
  const [searchParams] = useSearchParams();
  const landlord = searchParams.get("landlord") || "";

  return (
    <>
      {!landlord && <h2>Landlords</h2>}
      {landlord && <Collection collection={landlord} />}
    </>
  );
};
