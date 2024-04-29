// import { AddressRecord } from "../../types/APIDataTypes";
import React from "react";
import { PortfolioTable } from "../PortfolioTable/PortfolioTable";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export const Portfolio: React.FC = () => {
  const { data, error, isLoading } = useSWR(
    "https://wow-django.herokuapp.com/api/address/wowza?block=04290&lot=0008&borough=2",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return (
    <>
      Portfolio
      {isLoading && <div>loading...</div>}
      {error && <div>{error}</div>}
      {data && <PortfolioTable data={data.addrs} />}
    </>
  );
};
