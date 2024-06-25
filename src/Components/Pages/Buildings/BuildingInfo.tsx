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
import { InternalLinks } from "../../LinksBox/InternalLinks";
import { ExternalLinks } from "../../LinksBox/ExternalLinks";
import { PageTitle } from "../../PageTitle/PageTitle";
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
          <PageTitle className="building-address">{buildingInfo.address}</PageTitle>
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
          <aside className="related-links-container">
            <InternalLinks buildingInfo={buildingInfo} />
            <ExternalLinks buildingInfo={buildingInfo} />
          </aside>
        </>
      )}

      <h3>Summary</h3>

      <h4>Key Indicators</h4>
      {buildingInfo && (
        <BuildingSummaryTable
          data={buildingInfo}
          className="building-detail-table"
        />
      )}

      <h3>Detail Tables</h3>
      <h4>Building Info</h4>
      {buildingInfoIsLoading && <div>loading...</div>}
      {buildingInfo && (
        <BuildingInformationTable
          data={buildingInfo}
          className="building-detail-table"
        />
      )}

      <h4>Building Indicators Project (BIP)</h4>
      {buildingInfoIsLoading && <div>loading...</div>}
      {buildingInfo && (
        <BuildingBIPTable
          data={buildingInfo}
          className="building-detail-table"
        />
      )}

      <h4>Financials</h4>
      {buildingInfoIsLoading && <div>loading...</div>}
      {buildingInfo && (
        <BuildingFinancialTable
          data={buildingInfo}
          className="building-detail-table"
        />
      )}

      <h4>HPD Violations</h4>
      {buildingInfoIsLoading && <div>loading...</div>}
      {buildingInfo && (
        <BuildingHPDViolationsTable
          data={buildingInfo}
          className="building-detail-table"
        />
      )}

      <h4>HPD Complaints</h4>
      {buildingInfoIsLoading && <div>loading...</div>}
      {buildingInfo && (
        <BuildingHPDComplaintsTable
          data={buildingInfo}
          className="building-detail-table"
        />
      )}

      <h4>HPD Emergency Repairs</h4>
      {buildingInfoIsLoading && <div>loading...</div>}
      {buildingInfo && (
        <BuildingHPDRepairsTable
          data={buildingInfo}
          className="building-detail-table"
        />
      )}

      <h4>Department of Health Inspections</h4>
      {buildingInfoIsLoading && <div>loading...</div>}
      {buildingInfo && (
        <BuildingDOHMHInspectionsTable
          data={buildingInfo}
          className="building-detail-table"
        />
      )}

      <h4>Evictions</h4>
      {buildingInfoIsLoading && <div>loading...</div>}
      {buildingInfo && (
        <BuildingEvictionsTable
          data={buildingInfo}
          className="building-detail-table"
        />
      )}

      <h4>HPD Litigation Against Landlords</h4>
      {buildingInfoIsLoading && <div>loading...</div>}
      {buildingInfo && (
        <BuildingHPDLitigationTable
          data={buildingInfo}
          className="building-detail-table"
        />
      )}

      <h4>DOB Permits & Violations</h4>
      {buildingInfoIsLoading && <div>loading...</div>}
      {buildingInfo && (
        <BuildingDOBPermitsViolationsTable
          data={buildingInfo}
          className="building-detail-table"
        />
      )}

      <h4>HPD Programs</h4>
      {buildingInfoIsLoading && <div>loading...</div>}
      {buildingInfo && (
        <BuildingHPDProgramsTable
          data={buildingInfo}
          className="building-detail-table"
        />
      )}

      <h4>Fines, Fees & Charges</h4>
      {buildingInfoIsLoading && <div>loading...</div>}
      {buildingInfo && (
        <BuildingFinesFeesChargesTable
          data={buildingInfo}
          className="building-detail-table"
        />
      )}

      <h4>Political Districts</h4>
      {buildingInfoIsLoading && <div>loading...</div>}
      {buildingInfo && (
        <BuildingPoliticalDistrictsTable
          data={buildingInfo}
          className="building-detail-table"
        />
      )}

      <h3>Trend Charts</h3>
      <h4>HPD Violations</h4>

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
