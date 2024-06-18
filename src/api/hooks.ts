import useSWR from "swr";
import { BuildingInfo, ChartData, CollectionInfo } from "../types/APIDataTypes";
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

type ChartDataSWRResponse = {
  data: ChartData[];
  isLoading: boolean;
  error: Error | undefined;
};

export function useGetBuildingChartData(bbl: string): ChartDataSWRResponse {
  const { data, error, isLoading } = useSWR(
    `/signature/building/charts?bbl=${bbl}`,
    apiFetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  return {
    data: data?.result,
    isLoading,
    error: error,
  };
}

export function useGetCollectionChartData(
  collection: string,
): ChartDataSWRResponse {
  const { data, error, isLoading } = useSWR(
    `/signature/collection/charts?collection=${collection}`,
    apiFetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  return {
    data: data?.result,
    isLoading,
    error: error,
  };
}

type BBLSWRResponse = {
  data: string[];
  isLoading: boolean;
  error: Error | undefined;
};

export function useGetAllBBLs(): BBLSWRResponse {
  const { data, error, isLoading } = useSWR(`/signature/bbls`, apiFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    data: data?.result,
    isLoading,
    error: error,
  };
}
