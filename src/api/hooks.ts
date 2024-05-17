import useSWR from "swr";
import { SearchResults } from "../types/APIDataTypes";
import { IndicatorsDataFromAPI } from "../types/IndicatorsTypes";
import { splitBBL } from "../util/helpers";
import { apiFetcher } from "./helpers";

/** ----------------------------------------------------------------------- */
/** ------------------------ Get Indicator History ------------------------ */
/** ----------------------------------------------------------------------- */

type IndicatorSWRResponse = {
  indicators: IndicatorsDataFromAPI[];
  isLoading: boolean;
  error: Error | undefined;
};

export function useGetIndicatorHistory(bbl: string): IndicatorSWRResponse {
  const { data, error, isLoading } = useSWR(
    `/api/address/indicatorhistory?bbl=${bbl}`,
    apiFetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  return {
    indicators: data?.result,
    isLoading,
    error: error,
  };
}

/** ----------------------------------------------------------------------- */
/** --------------------------- Search for BBL ---------------------------- */
/** ----------------------------------------------------------------------- */

type PortfolioSWRResponse = {
  data: SearchResults;
  isLoading: boolean;
  error: Error | undefined;
};

export function useSearchForBBL(bbl: string): PortfolioSWRResponse {
  const { block, boro, lot } = splitBBL(bbl);
  const { data, error, isLoading } = useSWR(
    `/api/address/wowza?block=${block}&borough=${boro}&lot=${lot}`,
    apiFetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  return {
    data: data,
    isLoading,
    error: error,
  };
}
