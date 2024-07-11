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

      <SectionHeader id="buildings-table">Building Table</SectionHeader>
      <p>
        {data.bldg_data.length} buildings owned by {data.collection_name}
      </p>
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
