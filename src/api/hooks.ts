import useSWR from "swr";
import { BuildingInfo } from "../types/APIDataTypes";
import { apiFetcher } from "./helpers";

/** ----------------------------------------------------------------------- */
/** ------------------------ Get Indicator History ------------------------ */
/** ----------------------------------------------------------------------- */

type IndicatorSWRResponse = {
  data: BuildingInfo;
  isLoading: boolean;
  error: Error | undefined;
};


export function useGetBuildingInfo(bbl: string): IndicatorSWRResponse {
  const { data, error, isLoading } = useSWR(
    `/signature/building?bbl=${bbl}`,
    apiFetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  return {
    data: data?.result[0],
    isLoading,
    error: error,
  };
}