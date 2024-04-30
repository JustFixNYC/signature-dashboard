import React from "react";
import { useSearchParams } from "react-router-dom";
import { useGetIndicatorHistory } from "../../api/hooks";


export const Indicators: React.FC = () => {
  const [searchParams] = useSearchParams();
  const bbl = searchParams.get("bbl") || '';

  const { indicators, error, isLoading } = useGetIndicatorHistory(bbl)

  return (
    <>
      Indicators

      {isLoading && <div>loading...</div>}

      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}

      {indicators && <pre>{JSON.stringify(indicators, null, 2)}</pre>}
    </>
  );
};
