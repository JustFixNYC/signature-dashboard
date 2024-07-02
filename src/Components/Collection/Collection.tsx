// import { AddressRecord } from "../../types/APIDataTypes";
import React from "react";
import { useGetCollectionChartData } from "../../api/hooks";
import { DOBViolationsChart } from "../BarChart/DOBViolations";
import { HPDComplaintsChart } from "../BarChart/HPDComplaints";
import { HPDViolationsChart } from "../BarChart/HPDViolations";
import "./style.scss";
import { EvictionsChart } from "../BarChart/Evictions";
import { BuildingTable } from "../BuildingTable/BuildingTable";
import { CollectionInfo } from "../../types/APIDataTypes";

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
      <h3>Building Table</h3>
      <p>
        {data.bldg_data.length} buildings owned by {data.collection_name}
      </p>
      <BuildingTable
        data={data.bldg_data}
        {...(data.collection_type === "lender" && {
          pagination: true,
          pageSize: 100,
        })}
      />

      {chartIsLoading && <div>loading...</div>}
      {chartError && <pre>{JSON.stringify(chartError, null, 2)}</pre>}
      {chartData && data && (
        <div className="collection-charts">
          <h3>Trend Charts</h3>
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
    </div>
  );
};
