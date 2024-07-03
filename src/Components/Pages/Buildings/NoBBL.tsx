import React from "react";
import { PageTitle } from "../../PageTitle/PageTitle";
import { BuildingTable } from "../../BuildingTable/BuildingTable";
import { DownloadMultiBuildingCSV } from "../../CSVDownload/CSVDownload";
import { useGetCollectionInfo } from "../../../api/hooks";
import { AddressSearch } from "../../AlgoliaSearch/AlgoliaSearch";
import "./style.scss";

export const NoBBL: React.FC = () => {

  const { data, error, isLoading } = useGetCollectionInfo("all");

  return (
    <>
      <div className="top-bar">
        <PageTitle>Buildings</PageTitle>
        <div className="top-bar-actions">
          <DownloadMultiBuildingCSV data={data} labelText="Download all" />
        </div>
      </div>

      <div style={{ width: "fit-content" }}>
        <AddressSearch labelText="Find a building in the Signature portfolio by entering the address" />
      </div>
      {isLoading && <div>loading...</div>}
      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
      {data && (
        <BuildingTable data={data.bldg_data} pagination={true} pageSize={100} />
      )}
    </>
  );
};
