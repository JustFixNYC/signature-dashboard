// import { AddressRecord } from "../../types/APIDataTypes";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetBuildingChartData, useGetBuildingInfo } from "../../api/hooks";
import { BuildingSummaryTable } from "../BuildingSummaryTable/BuildingSummaryTable";
import { BuildingBandCChart } from "../BuildingBAndCChart/BuildingBAndCChart";
import { BuildingHPDCompEmerg } from "../BuildingHPDCompEmerg/BuildingHPDCompEmerg";
import { RadioButton } from "@justfixnyc/component-library";

export const BuildingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const bbl = searchParams.get("bbl") || "";

  const [bAndCTimeSpan, setBAndCTimespan] = useState<"two-years" | "all-time">(
    "two-years",
  );

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

      <h3>HPD Violations</h3>

      {chartIsLoading && <div>loading...</div>}
      {chartError && <pre>{JSON.stringify(chartError, null, 2)}</pre>}
      {chartData && (
        <>
          <RadioButton
            name="b-and-c-timespan"
            labelText="Past 2 years"
            id="radio-two-years"
            value="two-years"
            checked={bAndCTimeSpan === "two-years"}
            onChange={() => setBAndCTimespan("two-years")}
          />
          <RadioButton
            name="b-and-c-timespan"
            labelText="All time"
            id="radio-all-time"
            value="all-time"
            checked={bAndCTimeSpan === "all-time"}
            onChange={() => setBAndCTimespan("all-time")}
          />
          <BuildingBandCChart
            data={chartData}
            timespan={bAndCTimeSpan}
            buildingInfo={buildingInfo}
          />
        </>
      )}

      <h3>HPD Complaints</h3>
      {chartIsLoading && <div>loading...</div>}
      {chartError && <pre>{JSON.stringify(chartError, null, 2)}</pre>}
      {chartData && (
        <>
          <BuildingHPDCompEmerg data={chartData} />
        </>
      )}
    </>
  );
};
