import React from "react";
import { useSearchParams } from "react-router-dom";
import { NoLoanPool } from "./NoLoanPool";
import { LoanPoolInfo } from "./LoanPoolInfo";
import "./style.scss";

export const LoanPools: React.FC = () => {
  const [searchParams] = useSearchParams();
  const loanPool = searchParams.get("loan-pool") || "";

  return (
    <>
      {!loanPool && <NoLoanPool />}
      {loanPool && <LoanPoolInfo loanPool={loanPool} />}
    </>
  );
};
