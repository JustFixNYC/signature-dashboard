// import { AddressRecord } from "../../types/APIDataTypes";
import React, { useState } from "react";
import {
  useGetBuildingChartData,
  useGetBuildingInfo,
} from "../../../api/hooks";
import { BuildingSummaryTable } from "./Tables/BuildingSummaryTable";
import { BuildingBandCChart } from "./Charts/BuildingBAndCChart/BuildingBAndCChart";
// import { BuildingHPDCompEmerg } from "../BuildingHPDCompEmerg/BuildingHPDCompEmerg";
import { RadioButton } from "@justfixnyc/component-library";
import "./style.scss";
import { BuildingFinancialTable } from "./Tables/BuildingFinancialTable";
import { BuildingHPDViolationsTable } from "./Tables/BuildingHPDViolationsTable";
import { BuildingHPDComplaintsTable } from "./Tables/BuildingHPDComplaints";
import { BuildingEvictionsTable } from "./Tables/BuildingEvictionsTable";
import { BuildingHPDLitigationTable } from "./Tables/BuildingHPDLitigationTable";
import { BuildingHPDProgramsTable } from "./Tables/BuildingHPDProgramsTable";
import { BuildingPoliticalDistrictsTable } from "./Tables/BuildingPoliticalDistrictsTable";
import { BuildingDOHMHInspectionsTable } from "./Tables/BuildingDOHMHInspectionsTable";
import { BuildingDOBPermitsViolationsTable } from "./Tables/BuildingDOBPermitsViolationsTable";
import { BuildingFinesFeesChargesTable } from "./Tables/BuildingFinesFeesChargesTable";
import { BuildingHPDRepairsTable } from "./Tables/BuildingHPDRepairsTable";
import { BuildingInformationTable } from "./Tables/BuildingInformationTable";
import { BuildingBIPTable } from "./Tables/BuildingBIPTable";
import { Link } from "react-router-dom";
export interface BuildingInfoProps {
  bbl: string;
}

export const BuildingInfo: React.FC<BuildingInfoProps> = ({ bbl }) => {
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
      {buildingInfoIsLoading && <div>loading...</div>}
      {buildingInfoError && (
        <pre>{JSON.stringify(buildingInfoError, null, 2)}</pre>
      )}
      {buildingInfo && (
        <>
          <h3 className="building-address">{buildingInfo.address}</h3>
          <div>BBL: {buildingInfo.bbl}</div>
          <div>Borough: {buildingInfo.borough}</div>
          <div>Zip: {buildingInfo.zip}</div>
          <div>
            Landlord:{" "}
            <Link to={`/landlords?landlord=${buildingInfo.landlord_slug}`}>
              {buildingInfo.landlord}
            </Link>
          </div>
          <div>
            Lender:{" "}
            <Link to={`/lenders?lender=${buildingInfo.lender_slug}`}>
              {buildingInfo.lender}
            </Link>
          </div>
        </>
      )}

      <h2>Summary</h2>

      <h3>Key Indicators</h3>
      {buildingInfo && (
        <BuildingSummaryTable
          data={buildingInfo}
          className="building-detail-table"
        />
      )}

      <h2>Detail Tables</h2>
      <h3>Building Info</h3>
      {buildingInfoIsLoading && <div>loading...</div>}
      {buildingInfo && (
        <BuildingInformationTable
          data={buildingInfo}
          className="building-detail-table"
        />
      )}

      <h3>Building Indicators Project (BIP)</h3>
      {buildingInfoIsLoading && <div>loading...</div>}
      {buildingInfo && (
        <BuildingBIPTable
          data={buildingInfo}
          className="building-detail-table"
        />
      )}

      <h3>Financials</h3>
      {buildingInfoIsLoading && <div>loading...</div>}
      {buildingInfo && (
        <BuildingFinancialTable
          data={buildingInfo}
          className="building-detail-table"
        />
      )}

      <h3>HPD Violations</h3>
      {buildingInfoIsLoading && <div>loading...</div>}
      {buildingInfo && (
        <BuildingHPDViolationsTable
          data={buildingInfo}
          className="building-detail-table"
        />
      )}

      <h3>HPD Complaints</h3>
      {buildingInfoIsLoading && <div>loading...</div>}
      {buildingInfo && (
        <BuildingHPDComplaintsTable
          data={buildingInfo}
          className="building-detail-table"
        />
      )}

      <h3>HPD Emergency Repairs</h3>
      {buildingInfoIsLoading && <div>loading...</div>}
      {buildingInfo && (
        <BuildingHPDRepairsTable
          data={buildingInfo}
          className="building-detail-table"
        />
      )}

      <h3>Department of Health Inspections</h3>
      {buildingInfoIsLoading && <div>loading...</div>}
      {buildingInfo && (
        <BuildingDOHMHInspectionsTable
          data={buildingInfo}
          className="building-detail-table"
        />
      )}

      <h3>Evictions</h3>
      {buildingInfoIsLoading && <div>loading...</div>}
      {buildingInfo && (
        <BuildingEvictionsTable
          data={buildingInfo}
          className="building-detail-table"
        />
      )}

      <h3>HPD Litigation Against Landlords</h3>
      {buildingInfoIsLoading && <div>loading...</div>}
      {buildingInfo && (
        <BuildingHPDLitigationTable
          data={buildingInfo}
          className="building-detail-table"
        />
      )}

      <h3>DOB Permits & Violations</h3>
      {buildingInfoIsLoading && <div>loading...</div>}
      {buildingInfo && (
        <BuildingDOBPermitsViolationsTable
          data={buildingInfo}
          className="building-detail-table"
        />
      )}

      <h3>HPD Programs</h3>
      {buildingInfoIsLoading && <div>loading...</div>}
      {buildingInfo && (
        <BuildingHPDProgramsTable
          data={buildingInfo}
          className="building-detail-table"
        />
      )}

      <h3>Fines, Fees & Charges</h3>
      {buildingInfoIsLoading && <div>loading...</div>}
      {buildingInfo && (
        <BuildingFinesFeesChargesTable
          data={buildingInfo}
          className="building-detail-table"
        />
      )}

      <h3>Political Districts</h3>
      {buildingInfoIsLoading && <div>loading...</div>}
      {buildingInfo && (
        <BuildingPoliticalDistrictsTable
          data={buildingInfo}
          className="building-detail-table"
        />
      )}

      <h2>Trend Charts</h2>
      <h3>HPD Violations</h3>

      {chartIsLoading && <div>loading...</div>}
      {chartError && <pre>{JSON.stringify(chartError, null, 2)}</pre>}
      {chartData && (
        <>
          <div className="chart__timespan_filter">
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
          </div>
          <BuildingBandCChart
            data={chartData}
            timespan={bAndCTimeSpan}
            buildingInfo={buildingInfo}
          />
        </>
      )}
    </>
  );
};
