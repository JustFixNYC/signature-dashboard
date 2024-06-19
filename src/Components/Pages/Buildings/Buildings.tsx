import React from "react";
import { useSearchParams } from "react-router-dom";
import { BuildingInfo } from "./BuildingInfo";
import { NoBBL } from "./NoBBL";
import "./style.scss";

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
