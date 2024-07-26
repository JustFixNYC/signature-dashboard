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
import {
  SectionHeader,
  SubSectionHeader,
} from "../../SectionHeader/SectionHeader";
import {
  TableOfContents,
  TOCHeader,
  TOCItem,
  TOCList,
} from "../../TableOfContents/TableOfContents";
import { Loading } from "../../Loading/Loading";

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

      {buildingInfoIsLoading && lastUpdatedIsLoading && <Loading />}
      {buildingInfoError && (
        <pre>{JSON.stringify(buildingInfoError, null, 2)}</pre>
      )}
      {lastUpdatedError && (
        <pre>{JSON.stringify(lastUpdatedError, null, 2)}</pre>
      )}
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
              <Link to={`/landlords?landlord=${buildingInfo.landlord_slug}`}>
                {buildingInfo.landlord}
              </Link>
            ) : (
              <span className="not-available">Not available</span>
            )}
          </div>
          <div>
            Loan pool:{" "}
            {buildingInfo.loan_pool ? (
              <Link to={`/loan-pools?loan-pool=${buildingInfo.loan_pool_slug}`}>
                {buildingInfo.loan_pool}
              </Link>
            ) : (
              <span className="not-available">N/A</span>
            )}
          </div>
          <hr className="divider" />
          <div className="layout-two-col">
            <div>
              <TableOfContents>
                <TOCHeader>On this page</TOCHeader>
                <TOCList>
                  <TOCItem href="#summary-stats">Summary stats</TOCItem>
                  <TOCItem href="#all-data">All data</TOCItem>
                  <TOCItem href="#trend-charts">Trend charts</TOCItem>
                </TOCList>
              </TableOfContents>

              <SectionHeader id="summary-stats" className="scroll-el">
                Summary stats
              </SectionHeader>
              <BuildingSummaryTable
                data={buildingInfo}
                lastUpdatedData={lastUpdatedData}
                className="building-detail-table"
              />

              <SectionHeader id="all-data">All data</SectionHeader>
              <SubSectionHeader>Building Info</SubSectionHeader>
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

              <SubSectionHeader>
                Building Indicators Project (BIP)
              </SubSectionHeader>
              <BuildingDetailTable
                data={buildingInfo}
                lastUpdatedData={lastUpdatedData}
                indicators={["bip"]}
              />

              <SubSectionHeader>Financials</SubSectionHeader>
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

              <SubSectionHeader>HPD Violations</SubSectionHeader>
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

              <SubSectionHeader>HPD Complaints</SubSectionHeader>
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

              <SubSectionHeader>HPD Emergency Repairs</SubSectionHeader>
              <BuildingDetailTable
                data={buildingInfo}
                lastUpdatedData={lastUpdatedData}
                indicators={["hpd_erp_orders", "hpd_erp_orders_per_unit"]}
              />

              <SubSectionHeader>Vacate Orders</SubSectionHeader>
              <BuildingDetailTable
                data={buildingInfo}
                lastUpdatedData={lastUpdatedData}
                indicators={["hpd_active_vacate"]}
              />

              <SubSectionHeader>
                Department of Health Inspections
              </SubSectionHeader>
              <BuildingDetailTable
                data={buildingInfo}
                lastUpdatedData={lastUpdatedData}
                indicators={["last_rodent_date", "last_rodent_result"]}
              />

              <SubSectionHeader>Evictions</SubSectionHeader>
              <BuildingDetailTable
                data={buildingInfo}
                lastUpdatedData={lastUpdatedData}
                indicators={["evictions_filed", "evictions_executed"]}
              />

              <SubSectionHeader>
                HPD Litigation Against Landlords
              </SubSectionHeader>
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

              <SubSectionHeader>DOB Permits & Violations</SubSectionHeader>
              <BuildingDetailTable
                data={buildingInfo}
                lastUpdatedData={lastUpdatedData}
                indicators={[
                  "dob_jobs",
                  "dob_ecb_viol_open",
                  "dob_ecb_viol_total",
                ]}
              />

              <SubSectionHeader>HPD Programs</SubSectionHeader>
              <BuildingDetailTable
                data={buildingInfo}
                lastUpdatedData={lastUpdatedData}
                indicators={["in_aep", "in_conh", "in_ucp"]}
              />

              <SubSectionHeader>Fines, Fees & Charges</SubSectionHeader>
              <BuildingDetailTable
                data={buildingInfo}
                lastUpdatedData={lastUpdatedData}
                indicators={[
                  "water_charges",
                  "hpd_erp_charges",
                  "hpd_erp_charges_per_unit",
                ]}
              />

              <SubSectionHeader>Political Districts</SubSectionHeader>
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

              {chartIsLoading && <Loading />}
              {chartError && <pre>{JSON.stringify(chartError, null, 2)}</pre>}
              {chartData && buildingInfo && (
                <>
                  <SectionHeader id="trend-charts">Trend charts</SectionHeader>
                  <HPDViolationsChart
                    title={
                      <SubSectionHeader className="chart__title">
                        HPD Violations
                      </SubSectionHeader>
                    }
                    dataUnitName="building"
                    data={chartData}
                    originationDate={buildingInfo.origination_date}
                    lastSaleDate={buildingInfo.last_sale_date}
                  />
                  <HPDComplaintsChart
                    title={
                      <SubSectionHeader className="chart__title">
                        HPD Complaints
                      </SubSectionHeader>
                    }
                    dataUnitName="building"
                    data={chartData}
                    originationDate={buildingInfo.origination_date}
                    lastSaleDate={buildingInfo.last_sale_date}
                  />
                  <DOBViolationsChart
                    title={
                      <SubSectionHeader className="chart__title">
                        DOB/ECB Violations
                      </SubSectionHeader>
                    }
                    dataUnitName="building"
                    data={chartData}
                    originationDate={buildingInfo.origination_date}
                    lastSaleDate={buildingInfo.last_sale_date}
                  />
                  <DOBPermitsChart
                    title={
                      <SubSectionHeader className="chart__title">
                        DOB Permits
                      </SubSectionHeader>
                    }
                    dataUnitName="building"
                    data={chartData}
                    originationDate={buildingInfo.origination_date}
                    lastSaleDate={buildingInfo.last_sale_date}
                  />
                  <HPDERPChargesChart
                    title={
                      <SubSectionHeader className="chart__title">
                        HPD Emergency Repair Program Charges
                      </SubSectionHeader>
                    }
                    dataUnitName="building"
                    data={chartData}
                    originationDate={buildingInfo.origination_date}
                    lastSaleDate={buildingInfo.last_sale_date}
                  />
                  <RentStabilizedUnitsChart
                    title={
                      <SubSectionHeader className="chart__title">
                        Rent Stabilized Units
                      </SubSectionHeader>
                    }
                    dataUnitName="building"
                    data={chartData}
                    originationDate={buildingInfo.origination_date}
                    lastSaleDate={buildingInfo.last_sale_date}
                  />
                  <EvictionsChart
                    title={
                      <SubSectionHeader className="chart__title">
                        Evictions
                      </SubSectionHeader>
                    }
                    data={chartData}
                    unitsRes={buildingInfo.units_res}
                    dataUnitName="building"
                    originationDate={buildingInfo.origination_date}
                    lastSaleDate={buildingInfo.last_sale_date}
                  />
                </>
              )}
            </div>

            <div>
              <aside className="related-links-container">
                <InternalLinks buildingInfo={buildingInfo} />
                <ExternalLinks buildingInfo={buildingInfo} />
              </aside>
            </div>
          </div>
        </>
      )}
    </>
  );
};
