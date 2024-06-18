// import { AddressRecord } from "../../types/APIDataTypes";
import React from "react";
import { useSearchParams } from "react-router-dom";
// import { BuildingHPDCompEmerg } from "../BuildingHPDCompEmerg/BuildingHPDCompEmerg";
import "./style.scss";
import { BuildingInfo } from "./BuildingInfo";
import { NoBBL } from "./NoBBL";

export const Buildings: React.FC = () => {
  const [searchParams] = useSearchParams();
  const bbl = searchParams.get("bbl") || "";

  return (
    <>
      {!bbl && <NoBBL />}
      {bbl && <BuildingInfo bbl={bbl} />}
    </>
  );
};
