// import { AddressRecord } from "../../types/APIDataTypes";
import React from "react";
import {
  useGetCollectionChartData,
  useGetCollectionInfo,
} from "../../api/hooks";
import { CollectionSummaryTable } from "./CollectionSummaryTable/CollectionSummaryTable";
import { columns as buildingColumns } from "./BuildingTableColumns";
import { Table } from "../Table/Table";
import { InternalLinks } from "../LinksBox/InternalLinks";
import { PageTitle } from "../PageTitle/PageTitle";
import { DOBViolationsChart } from "../BarChart/DOBViolations";
import { HPDComplaintsChart } from "../BarChart/HPDComplaints";
import { HPDViolationsChart } from "../BarChart/HPDViolations";
import "./style.scss";
import { EvictionsChart } from "../BarChart/Evictions";

type CollectionProps = {
  collection: string;
};

export const Collection: React.FC<CollectionProps> = ({ collection }) => {
  const { data, error, isLoading } = useGetCollectionInfo(collection);

  const {
    data: chartData,
    error: chartError,
    isLoading: chartIsLoading,
  } = useGetCollectionChartData(collection);

  return (
    <div style={{ minHeight: "1500px" }}>
      {isLoading && <div>loading...</div>}
      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
      {data && (
        <>
          <div className="layout-two-col">
            <div>
              {data.collection_type === "landlord" && (
                <PageTitle className="landlord-name">
                  {data.collection_name}
                </PageTitle>
              )}

              <h3>Key Indicators</h3>
              <CollectionSummaryTable data={data} />
            </div>

            <div>
              {data.collection_type === "landlord" && (
                <aside className="related-links-container">
                  <InternalLinks collectionInfo={data} />
                </aside>
              )}
            </div>
          </div>
          <h3>Building Table</h3>
          <p>
            {data.bldg_data.length} buildings owned by {data.collection_name}
          </p>
          <Table
            data={data.bldg_data}
            columns={buildingColumns}
            {...(data.collection_type === "lender" && {
              pagination: true,
              pageSize: 100,
            })}
            initialState={{
              sorting: [{ id: "units_res", desc: true }],
              columnPinning: { left: ["address"] },
            }}
          />
        </>
      )}
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
