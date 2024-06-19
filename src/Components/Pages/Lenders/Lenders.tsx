// import { AddressRecord } from "../../types/APIDataTypes";
import React from "react";
import { useSearchParams } from "react-router-dom";
import "./style.scss";
import { Collection } from "../../Collection/Collection";

export const Lenders: React.FC = () => {
  const [searchParams] = useSearchParams();
  const lender = searchParams.get("lender") || "";

  return (
    <>
      {!lender && <h2>Lenders</h2>}
      {lender && <Collection collection={lender} />}
    </>
  );
};
