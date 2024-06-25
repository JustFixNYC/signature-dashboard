// import { AddressRecord } from "../../types/APIDataTypes";
import React from "react";
import "./style.scss";
import { PageTitle } from "../../PageTitle/PageTitle";
import { useGetMapData } from "../../../api/hooks";
import { MapBox } from "../../MapBox/MapBox";

export const Map: React.FC = () => {
  const {
    data: mapData,
    error: mapDataError,
    isLoading: mapDataIsLoading,
  } = useGetMapData();

  return (
    <>
      <PageTitle>Map</PageTitle>

      {mapDataIsLoading && <div>loading...</div>}
      {mapDataError && <pre>{JSON.stringify(mapDataError, null, 2)}</pre>}

      <div className="map-container">
        {!!mapData && <MapBox data={mapData} />}
      </div>
    </>
  );
};
