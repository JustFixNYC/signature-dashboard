// import { AddressRecord } from "../../types/APIDataTypes";
import React from "react";
import { PortfolioTable } from "../PortfolioTable/PortfolioTable";
import { useSearchParams } from "react-router-dom";
import { useSearchForBBL } from "../../api/hooks";

export const Portfolio: React.FC = () => {
  const [searchParams] = useSearchParams();
  const bbl = searchParams.get("bbl") || "";

  const { data, error, isLoading } = useSearchForBBL(bbl);

  return (
    <>
      Portfolio
      {isLoading && <div>loading...</div>}
      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
      {data && <PortfolioTable data={data.addrs} />}
    </>
  );
};
