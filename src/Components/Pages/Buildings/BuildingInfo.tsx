// import { AddressRecord } from "../../types/APIDataTypes";
import React from "react";
import {
  useGetBuildingChartData,
  useGetBuildingInfo,
  useGetDatasetLastUpdated,
} from "../../../api/hooks";
import { BuildingSummaryTable } from "./Tables/BuildingSummaryTable";
import "./style.scss";
import { Link } from "react-router-dom";
import JFCLLinkInternal from "../../JFCLLinkInternal";
import { InternalLinks } from "../../LinksBox/InternalLinks";
import { ExternalLinks } from "../../LinksBox/ExternalLinks";
import { PageTitle } from "../../PageTitle/PageTitle";
import { DOBViolationsChart } from "../../BarChart/DOBViolations";
import { HPDViolationsChart } from "../../BarChart/HPDViolations";
import { HPDComplaintsChart } from "../../BarChart/HPDComplaints";
import { EvictionsChart } from "../../BarChart/Evictions";
import { BreadCrumbs } from "../../BreadCrumbs/BreadCrumbs";
import { DownloadBuildingCSV } from "../../CSVDownload/CSVDownload";
import { DOBPermitsChart } from "../../BarChart/DOBPermits";
import { HPDERPChargesChart } from "../../BarChart/HPDERPCharges";
import { RentStabilizedUnitsChart } from "../../BarChart/RentStabilized";
import { BuildingDetailTable } from "./Tables/BuildingDetailTable";
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

  const {
    data: lastUpdatedData,
    error: lastUpdatedError,
    isLoading: lastUpdatedIsLoading,
  } = useGetDatasetLastUpdated();

  return (
    <>
      <div className="top-bar">
        <BreadCrumbs
          crumbs={[
            { path: "/buildings", name: "Buildings" },
            { name: buildingInfo?.address },
          ]}
        />
        <div className="top-bar-actions">
          <DownloadBuildingCSV
            data={buildingInfo}
            labelText="Download building data"
          />
          <JFCLLinkInternal href={`/map?bbl=${buildingInfo?.bbl}`}>
            View on map
          </JFCLLinkInternal>
        </div>
      </div>
      {buildingInfoIsLoading && lastUpdatedIsLoading && <div>loading...</div>}
      {buildingInfoError && (
        <pre>{JSON.stringify(buildingInfoError, null, 2)}</pre>
      )}
      {lastUpdatedError && (
        <pre>{JSON.stringify(lastUpdatedError, null, 2)}</pre>
      )}

      <div className="layout-two-col">
        <div>
          {buildingInfo && lastUpdatedData && (
            <>
              <PageTitle className="building-address">
                {buildingInfo.address}
              </PageTitle>
              <div>BBL: {buildingInfo.bbl}</div>
              <div>Borough: {buildingInfo.borough}</div>
              <div>Zip: {buildingInfo.zip}</div>
              <div>
                Landlord:{" "}
                {buildingInfo.landlord ? (
                  <Link
                    to={`/landlords?landlord=${buildingInfo.landlord_slug}`}
                  >
                    {buildingInfo.landlord}
                  </Link>
                ) : (
                  <span className="not-available">Not available</span>
                )}
              </div>
              <div>
                Lender:{" "}
                {buildingInfo.lender ? (
                  <Link to={`/lenders?lender=${buildingInfo.lender_slug}`}>
                    {buildingInfo.lender}
                  </Link>
                ) : (
                  <span className="not-available">N/A</span>
                )}
              </div>

              <h3>Summary</h3>
              <BuildingSummaryTable
                data={buildingInfo}
                lastUpdatedData={lastUpdatedData}
                className="building-detail-table"
              />

              <h3>All Data</h3>
              <h4>Building Info</h4>
              <BuildingDetailTable
                data={buildingInfo}
                lastUpdatedData={lastUpdatedData}
                indicators={[
                  "rs_units",
                  "units_res",
                  "units_nonres",
                  "year_built",
                ]}
              />

              <h4>Building Indicators Project (BIP)</h4>
              <BuildingDetailTable
                data={buildingInfo}
                lastUpdatedData={lastUpdatedData}
                indicators={["bip"]}
              />

              <h4>Financials</h4>
              <BuildingDetailTable
                data={buildingInfo}
                lastUpdatedData={lastUpdatedData}
                indicators={[
                  "debt_per_unit",
                  "debt_total",
                  "last_sale_date",
                  "origination_date",
                ]}
              />

              <h4>HPD Violations</h4>
              <BuildingDetailTable
                data={buildingInfo}
                lastUpdatedData={lastUpdatedData}
                indicators={[
                  "hpd_viol_bc_open_per_unit",
                  "hpd_viol_bc_open",
                  "hpd_viol_heat",
                  "hpd_viol_pests",
                  "hpd_viol_water",
                ]}
              />

              <h4>HPD Complaints</h4>
              <BuildingDetailTable
                data={buildingInfo}
                lastUpdatedData={lastUpdatedData}
                indicators={[
                  "hpd_comp_emerg_total",
                  "hpd_comp_emerg_total_per_unit",
                  "hpd_comp_apts",
                  "hpd_comp_apts_pct",
                  "hpd_comp_heat",
                  "hpd_comp_pests",
                  "hpd_comp_water",
                ]}
              />

              <h4>HPD Emergency Repairs</h4>
              <BuildingDetailTable
                data={buildingInfo}
                lastUpdatedData={lastUpdatedData}
                indicators={["hpd_erp_orders", "hpd_erp_orders_per_unit"]}
              />

              <h4>Vacate Orders</h4>
              <BuildingDetailTable
                data={buildingInfo}
                lastUpdatedData={lastUpdatedData}
                indicators={["hpd_active_vacate"]}
              />

              <h4>Department of Health Inspections</h4>
              <BuildingDetailTable
                data={buildingInfo}
                lastUpdatedData={lastUpdatedData}
                indicators={["last_rodent_date", "last_rodent_result"]}
              />

              <h4>Evictions</h4>
              <BuildingDetailTable
                data={buildingInfo}
                lastUpdatedData={lastUpdatedData}
                indicators={["evictions_filed", "evictions_executed"]}
              />

              <h4>HPD Litigation Against Landlords</h4>
              <BuildingDetailTable
                data={buildingInfo}
                lastUpdatedData={lastUpdatedData}
                indicators={[
                  "hp_active",
                  "hp_total",
                  "hp_find_harassment",
                  "hp_open_judgements",
                  "hp_penalies",
                ]}
              />

              <h4>DOB Permits & Violations</h4>
              <BuildingDetailTable
                data={buildingInfo}
                lastUpdatedData={lastUpdatedData}
                indicators={[
                  "dob_jobs",
                  "dob_ecb_viol_open",
                  "dob_ecb_viol_total",
                ]}
              />

              <h4>HPD Programs</h4>
              <BuildingDetailTable
                data={buildingInfo}
                lastUpdatedData={lastUpdatedData}
                indicators={["in_aep", "in_conh", "in_ucp"]}
              />

              <h4>Fines, Fees & Charges</h4>
              <BuildingDetailTable
                data={buildingInfo}
                lastUpdatedData={lastUpdatedData}
                indicators={[
                  "water_charges",
                  "hpd_erp_charges",
                  "hpd_erp_charges_per_unit",
                ]}
              />

              <h4>Political Districts</h4>
              <BuildingDetailTable
                data={buildingInfo}
                lastUpdatedData={lastUpdatedData}
                indicators={[
                  "coun_dist",
                  "assem_dist",
                  "stsen_dist",
                  "cong_dist",
                ]}
              />
            </>
          )}
          {chartIsLoading && <div>loading...</div>}
          {chartError && <pre>{JSON.stringify(chartError, null, 2)}</pre>}
          {chartData && buildingInfo && (
            <>
              <h3>Trend Charts</h3>
              <h4>HPD Violations</h4>
              <HPDViolationsChart
                data={chartData}
                originationDate={buildingInfo.origination_date}
                lastSaleDate={buildingInfo.last_sale_date}
              />
              <h4>HPD Complaints</h4>
              <HPDComplaintsChart
                data={chartData}
                originationDate={buildingInfo.origination_date}
                lastSaleDate={buildingInfo.last_sale_date}
              />

              <h4>DOB/ECB Violations</h4>
              <DOBViolationsChart
                data={chartData}
                originationDate={buildingInfo.origination_date}
                lastSaleDate={buildingInfo.last_sale_date}
              />

              <h4>DOB Permits</h4>
              <DOBPermitsChart
                data={chartData}
                originationDate={buildingInfo.origination_date}
                lastSaleDate={buildingInfo.last_sale_date}
              />

              <h4>HPD Emergency Repair Program Charges</h4>
              <HPDERPChargesChart
                data={chartData}
                originationDate={buildingInfo.origination_date}
                lastSaleDate={buildingInfo.last_sale_date}
              />

              <h4>Rent Stabilized Units</h4>
              <RentStabilizedUnitsChart
                data={chartData}
                originationDate={buildingInfo.origination_date}
                lastSaleDate={buildingInfo.last_sale_date}
              />

              <h4 className="has-chart-note">Evictions</h4>
              {buildingInfo.units_res < 11 && (
                <div className="chart-note">
                  Note: Eviction filings not available because the building has
                  less than 11 units. Data on evictions executed (Marshall
                  evictions) is still shown below.
                </div>
              )}
              <EvictionsChart
                data={chartData}
                originationDate={buildingInfo.origination_date}
                lastSaleDate={buildingInfo.last_sale_date}
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
