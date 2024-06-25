// import { AddressRecord } from "../../types/APIDataTypes";
import React from "react";
import {
  useGetBuildingChartData,
  useGetBuildingInfo,
} from "../../../api/hooks";
import { BuildingSummaryTable } from "./Tables/BuildingSummaryTable";
import { BuildingHPDViolations } from "./Charts/BuildingHPDViolations";
// import { BuildingHPDCompEmerg } from "../BuildingHPDCompEmerg/BuildingHPDCompEmerg";
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
import { BuildingHPDComplaints } from "./Charts/BuildingHPDCompEmerg";
import { BuildingDOBViolations } from "./Charts/BuildingDOBViolations";
export interface BuildingInfoProps {
  bbl: string;
}

export const BuildingInfo: React.FC<BuildingInfoProps> = ({ bbl }) => {
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

      <div className="layout-two-col">
        <div>
          {buildingInfo && (
            <>
              <PageTitle className="building-address">
                {buildingInfo.address}
              </PageTitle>
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
              <h3>Summary</h3>

              <h4>Key Indicators</h4>
              <BuildingSummaryTable
                data={buildingInfo}
                className="building-detail-table"
              />

              <h3>Detail Tables</h3>
              <h4>Building Info</h4>
              <BuildingInformationTable
                data={buildingInfo}
                className="building-detail-table"
              />

              <h4>Building Indicators Project (BIP)</h4>
              <BuildingBIPTable
                data={buildingInfo}
                className="building-detail-table"
              />

              <h4>Financials</h4>
              <BuildingFinancialTable
                data={buildingInfo}
                className="building-detail-table"
              />

              <h4>HPD Violations</h4>
              <BuildingHPDViolationsTable
                data={buildingInfo}
                className="building-detail-table"
              />

              <h4>HPD Complaints</h4>
              <BuildingHPDComplaintsTable
                data={buildingInfo}
                className="building-detail-table"
              />

              <h4>HPD Emergency Repairs</h4>
              <BuildingHPDRepairsTable
                data={buildingInfo}
                className="building-detail-table"
              />

              <h4>Department of Health Inspections</h4>
              <BuildingDOHMHInspectionsTable
                data={buildingInfo}
                className="building-detail-table"
              />

              <h4>Evictions</h4>
              <BuildingEvictionsTable
                data={buildingInfo}
                className="building-detail-table"
              />

              <h4>HPD Litigation Against Landlords</h4>
              <BuildingHPDLitigationTable
                data={buildingInfo}
                className="building-detail-table"
              />

              <h4>DOB Permits & Violations</h4>
              <BuildingDOBPermitsViolationsTable
                data={buildingInfo}
                className="building-detail-table"
              />

              <h4>HPD Programs</h4>
              <BuildingHPDProgramsTable
                data={buildingInfo}
                className="building-detail-table"
              />

              <h4>Fines, Fees & Charges</h4>
              <BuildingFinesFeesChargesTable
                data={buildingInfo}
                className="building-detail-table"
              />

              <h4>Political Districts</h4>
              <BuildingPoliticalDistrictsTable
                data={buildingInfo}
                className="building-detail-table"
              />
            </>
          )}
          {chartIsLoading && <div>loading...</div>}
          {chartError && <pre>{JSON.stringify(chartError, null, 2)}</pre>}
          {chartData && (
            <>
              <h3>Trend Charts</h3>
              <h4>HPD Violations</h4>
              <BuildingHPDViolations
                data={chartData}
                buildingInfo={buildingInfo}
              />

              <h4>HPD Complaints</h4>
              <BuildingHPDComplaints
                data={chartData}
                buildingInfo={buildingInfo}
              />

              <h4>DOB/ECB Violations</h4>
              <BuildingDOBViolations
                data={chartData}
                buildingInfo={buildingInfo}
              />
            </>
          )}
        </div>
        {buildingInfo && (
          <div>
            <aside className="related-links-container">
              <InternalLinks buildingInfo={buildingInfo} />
              <ExternalLinks buildingInfo={buildingInfo} />
            </aside>
          </div>
        )}
      </div>
    </>
  );
};
