import useSWR from "swr";
import {
  BuildingInfo,
  APIChartData,
  CollectionInfo,
  LandlordInfo,
  MapData,
  APIPortfolioData,
  DatasetLastUpdatedData,
} from "../types/APIDataTypes";
import { apiFetcher } from "./helpers";

type BuildingInfoSWRResponse = {
  data: BuildingInfo | undefined;
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
  data: CollectionInfo | undefined;
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
  data: APIChartData[] | undefined;
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
  data: string[] | undefined;
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

type LandlordInfoSWRResponse = {
  data: LandlordInfo[] | undefined;
  isLoading: boolean;
  error: Error | undefined;
};

export function useGetAllLandlords(): LandlordInfoSWRResponse {
  const { data, error, isLoading } = useSWR(
    `/signature/landlords`,
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

type MapDataSWRResponse = {
  data: MapData[] | undefined;
  isLoading: boolean;
  error: Error | undefined;
};

export function useGetMapData(): MapDataSWRResponse {
  const { data, error, isLoading } = useSWR(`/signature/map`, apiFetcher, {
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

type GetPortfoliosSWRResponse = {
  data: APIPortfolioData[] | undefined;
  isLoading: boolean;
  error: Error | undefined;
};

export function useGetPortfolios(): GetPortfoliosSWRResponse {
  const { data, error, isLoading } = useSWR(
    `/signature/portfolios`,
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

type GetDatasetLastUpdatedSWRResponse = {
  data: DatasetLastUpdatedData[] | undefined;
  isLoading: boolean;
  error: Error | undefined;
};

export function useGetDatasetLastUpdated(): GetDatasetLastUpdatedSWRResponse {
  const { data, error, isLoading } = useSWR(
    `/dataset/last_updated`,
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
