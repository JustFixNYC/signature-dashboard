import React from "react";
import { PageTitle } from "../../PageTitle/PageTitle";
import { BuildingTable } from "../../BuildingTable/BuildingTable";
import { DownloadMultiBuildingCSV } from "../../CSVDownload/CSVDownload";
import { useGetCollectionInfo } from "../../../api/hooks";
import { AddressSearch } from "../../AlgoliaSearch/AlgoliaSearch";
import "./style.scss";
import { formatNumber } from "../../../util/helpers";
import { Link } from "@justfixnyc/component-library";

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

      <AddressSearch labelText="Find a building in the Signature portfolio by entering the address" />
      <div className="find-links">
        <p>How else can I find a building?</p>
        <Link href={"/buildings"}>Search by landlord</Link>
        <Link href={"/map"}>View all buildings on map</Link>
      </div>

      {isLoading && <div>loading...</div>}
      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}

      <h3>Building Table</h3>
      {data && (
        <>
          <p>
            There are {formatNumber(data.bldg_data.length)} buildings in the
            Signature Portfolio Dashboard.
          </p>
          <BuildingTable
            data={data.bldg_data}
            pagination={true}
            pageSize={100}
          />
        </>
      )}
    </>
  );
};
