// import { AddressRecord } from "../../types/APIDataTypes";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { NoLandlord } from "./NoLandlord";
import { LandlordInfo } from "./LandlordInfo";
import "./style.scss";

export const Landlords: React.FC = () => {
  const [searchParams] = useSearchParams();
  const landlord = searchParams.get("landlord") || "";

  return (
    <>
      {!landlord && <NoLandlord />}
      {landlord && <LandlordInfo landlord={landlord} />}
    </>
  );
};
