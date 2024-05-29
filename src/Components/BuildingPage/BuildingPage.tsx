// import { AddressRecord } from "../../types/APIDataTypes";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { useGetBuildingInfo } from "../../api/hooks";
import { BuildingSummaryTable } from "../BuildingSummaryTable/BuildingSummaryTable";

export const BuildingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const bbl = searchParams.get("bbl") || "";

  const { data, error, isLoading } = useGetBuildingInfo(bbl);

  return (
    <>
      <h2>Building Page</h2>
      {isLoading && <div>loading...</div>}
      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
      {data && (
        <>
          <div>Address: {data.address}</div>
          <div>BBL: {data.bbl}</div>
          <div>Borough: {data.borough}</div>
          <div>Zip: {data.zip}</div>
          <div>Landlord: {data.landlord}</div>
          <h3>Summary Table</h3>
          <BuildingSummaryTable data={data} />
        </>
      )}
    </>
  );
};
