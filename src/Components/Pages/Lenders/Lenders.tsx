import React from "react";
import { useSearchParams } from "react-router-dom";
import { NoLender } from "./NoLender";
import { LenderInfo } from "./LenderInfo";
import "./style.scss";

export const Lenders: React.FC = () => {
  const [searchParams] = useSearchParams();
  const lender = searchParams.get("lender") || "";

  return (
    <>
      {!lender && <NoLender />}
      {lender && <LenderInfo lender={lender} />}
    </>
  );
};
