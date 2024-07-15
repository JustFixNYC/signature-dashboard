// import { AddressRecord } from "../../types/APIDataTypes";
import React from "react";
import "./style.scss";
import { PageTitle } from "../../PageTitle/PageTitle";
import { useGetMapData } from "../../../api/hooks";
import { MapBox } from "../../MapBox/MapBox";
import { useSearchParams } from "react-router-dom";

export const Map: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [bbl, setBBL] = React.useState("");
  const {
    data: mapData,
    error: mapDataError,
    isLoading: mapDataIsLoading,
  } = useGetMapData();

  React.useEffect(() => {
    const bblParam = searchParams.get("bbl") || "";
    setBBL(bblParam);
    setSearchParams(undefined, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <PageTitle>Map</PageTitle>

      {mapDataIsLoading && <div>loading...</div>}
      {mapDataError && <pre>{JSON.stringify(mapDataError, null, 2)}</pre>}

      {!!mapData && <MapBox data={mapData} initialSelectedBBL={bbl} />}
    </>
  );
};
