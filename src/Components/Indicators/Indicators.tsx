// import { AddressRecord } from "../../types/APIDataTypes";
import React from "react";
import useSWR from "swr";
import { useSearchParams } from "react-router-dom";

const fetcher = async (url: string) => {
  const res = await fetch(url);

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    console.log({res})
    const error = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

export const Indicators: React.FC = () => {
  const [searchParams] = useSearchParams();
  const bbl = searchParams.get("bbl");

  const { data, error, isLoading } = useSWR(
    `https://wow-django.herokuapp.com/api/address/indicatorhistory?bbl=${bbl}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  console.log({ error });
  return (
    <>
      Indicators
      {isLoading && <div>loading...</div>}
      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
      {data && <pre>{JSON.stringify(data.result, null, 2)}</pre>}
    </>
  );
};
