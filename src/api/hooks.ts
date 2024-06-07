import useSWR from "swr";
import { BuildingInfo, CollectionInfo } from "../types/APIDataTypes";
import { apiFetcher } from "./helpers";

type BuildingInfoSWRResponse = {
  data: BuildingInfo;
  isLoading: boolean;
  error: Error | undefined;
};

export function useGetBuildingInfo(bbl: string): BuildingInfoSWRResponse {
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

type CollectionInfoSWRResponse = {
  data: CollectionInfo;
  isLoading: boolean;
  error: Error | undefined;
};

export function useGetCollectionInfo(
  collection: string,
): CollectionInfoSWRResponse {
  const { data, error, isLoading } = useSWR(
    `/signature/collection?collection=${collection}`,
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
