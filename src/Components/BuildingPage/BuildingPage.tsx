// import { AddressRecord } from "../../types/APIDataTypes";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { useGetBuildingChartData, useGetBuildingInfo } from "../../api/hooks";
import { BuildingSummaryTable } from "../BuildingSummaryTable/BuildingSummaryTable";
import { BuildingBandCChart } from "../BuildingBAndCChart/BuildingBAndCChart";
import { BuildingHPDCompEmerg } from "../BuildingHPDCompEmerg/BuildingHPDCompEmerg";

export const BuildingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const bbl = searchParams.get("bbl") || "";

  const {
    data: buildingInfo,
    error: buildingInfoError,
    isLoading: buildingInfoIsLoading,
  } = useGetBuildingInfo(bbl);
  const {
    data: chartData,
    error: chartError,
    isLoading: chartIsLoading,
  } = useGetBuildingChartData(bbl);
  return (
    <>
      <h2>Building Page</h2>

      {buildingInfoIsLoading && <div>loading...</div>}
      {buildingInfoError && (
        <pre>{JSON.stringify(buildingInfoError, null, 2)}</pre>
      )}
      {buildingInfo && <pre>{JSON.stringify(buildingInfoError, null, 2)}</pre>}
      {buildingInfo && (
        <>
          <div>Address: {buildingInfo.address}</div>
          <div>BBL: {buildingInfo.bbl}</div>
          <div>Borough: {buildingInfo.borough}</div>
          <div>Zip: {buildingInfo.zip}</div>
          <div>Landlord: {buildingInfo.landlord}</div>
          <div>Lender: {buildingInfo.lender}</div>

          <h3>Summary Table</h3>
          <BuildingSummaryTable data={buildingInfo} />
        </>
      )}

      <h3>HPD Violations Class B and Class C</h3>

      {chartIsLoading && <div>loading...</div>}
      {chartError && <pre>{JSON.stringify(chartError, null, 2)}</pre>}
      {chartData && <BuildingBandCChart data={chartData} />}

      <h3>HPD Complaints Emergency and Non-emergency</h3>
      {chartIsLoading && <div>loading...</div>}
      {chartError && <pre>{JSON.stringify(chartError, null, 2)}</pre>}
      {chartData && <BuildingHPDCompEmerg data={chartData} />}
    </>
  );
};
