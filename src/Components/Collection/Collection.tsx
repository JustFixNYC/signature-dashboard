// import { AddressRecord } from "../../types/APIDataTypes";
import React from "react";
import { useGetCollectionChartData } from "../../api/hooks";
import { DOBViolationsChart } from "../BarChart/DOBViolations";
import { HPDComplaintsChart } from "../BarChart/HPDComplaints";
import { HPDViolationsChart } from "../BarChart/HPDViolations";
import { EvictionsChart } from "../BarChart/Evictions";
import { BuildingTable } from "../BuildingTable/BuildingTable";
import { CollectionInfo } from "../../types/APIDataTypes";
import "./style.scss";
import {
  SectionHeader,
  SubSectionHeader,
} from "../SectionHeader/SectionHeader";
import { SectionSubtitle } from "../SectionSubtitle/SectionSubtitle";
import { MapBox } from "../MapBox/MapBox";
import { buildingToMapData } from "../../util/helpers";

type CollectionProps = {
  collection: string;
  data: CollectionInfo;
};

export const Collection: React.FC<CollectionProps> = ({ collection, data }) => {
  const {
    data: chartData,
    error: chartError,
    isLoading: chartIsLoading,
  } = useGetCollectionChartData(collection);

  return (
    <div style={{ minHeight: "1500px" }}>
      {chartIsLoading && <div>loading...</div>}
      {chartError && <pre>{JSON.stringify(chartError, null, 2)}</pre>}
      {chartData && data && (
        <div className="collection-charts">
          <SectionHeader id="trend-charts">Trend Charts</SectionHeader>
          <HPDViolationsChart
            title={
              <SubSectionHeader className="chart__title">
                HPD Violations
              </SubSectionHeader>
            }
            data={chartData}
          />
          <HPDComplaintsChart
            title={
              <SubSectionHeader className="chart__title">
                HPD Complaints
              </SubSectionHeader>
            }
            data={chartData}
          />
          <DOBViolationsChart
            title={
              <SubSectionHeader className="chart__title">
                DOB/ECB Violations
              </SubSectionHeader>
            }
            data={chartData}
          />

          <EvictionsChart
            title={
              <SubSectionHeader className="chart__title">
                Evictions
              </SubSectionHeader>
            }
            data={chartData}
          />
        </div>
      )}

      {data.collection_type !== "all" && (
        <>
          {data.collection_type === "lender" && (
            <SectionHeader id="map">
              Map of buildings in {data.collection_name} portfolio
            </SectionHeader>
          )}
          {data.collection_type === "landlord" && (
            <SectionHeader id="map">
              Map of buildings owned by {data.collection_name}
            </SectionHeader>
          )}
          <MapBox
            data={buildingToMapData(data.bldg_data)}
            preventScrollZoom={true}
            className="collection-map"
          />
        </>
      )}

      {data.collection_type === "lender" && (
        <SectionHeader id="buildings-table">
          Buildings in {data.collection_name} portfolio
        </SectionHeader>
      )}
      {data.collection_type === "landlord" && (
        <>
          <SectionHeader id="buildings-table">
            Buildings owned by {data.collection_name}
          </SectionHeader>
          <SectionSubtitle>
            Rent-regulated properties associated with this landlord that were
            financed by Signature Bank.
          </SectionSubtitle>
        </>
      )}
      {data.collection_type === "all" && (
        <SectionHeader id="buildings-table">
          Buildings in Signature portfolio
        </SectionHeader>
      )}

      <BuildingTable data={data.bldg_data} pagination />
    </div>
  );
};
