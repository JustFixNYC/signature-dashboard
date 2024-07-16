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
import { SectionHeader } from "../SectionHeader/SectionHeader";
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
          <h4>HPD Violations</h4>
          <HPDViolationsChart data={chartData} />
          <h4>HPD Complaints</h4>
          <HPDComplaintsChart data={chartData} />

          <h4>DOB/ECB Violations</h4>
          <DOBViolationsChart data={chartData} />

          <h4>Evictions</h4>
          <EvictionsChart data={chartData} />
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
            <>
              <SectionHeader id="map">
                Map of buildings owned by {data.collection_name}
              </SectionHeader>
            </>
          )}
          <MapBox
            data={buildingToMapData(data.bldg_data)}
            scrollZoom={false}
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

      <BuildingTable
        data={data.bldg_data}
        {...((data.collection_type === "lender" ||
          data.collection_type === "all") && {
          pagination: true,
          pageSize: 100,
        })}
      />
    </div>
  );
};
