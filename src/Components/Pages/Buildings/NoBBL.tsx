import React from "react";
import { PageTitle } from "../../PageTitle/PageTitle";
import { BuildingTable } from "../../BuildingTable/BuildingTable";
import { DownloadMultiBuildingCSV } from "../../CSVDownload/CSVDownload";
import { useGetCollectionInfo } from "../../../api/hooks";
import { AddressSearch } from "../../AlgoliaSearch/AlgoliaSearch";
import "./style.scss";
import { formatNumber } from "../../../util/helpers";
import { Link } from "@justfixnyc/component-library";
import { Loading } from "../../Loading/Loading";
import { SectionHeader } from "../../SectionHeader/SectionHeader";

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

      <AddressSearch
        labelText="Search for a building by address"
        noResultsText="No buildings in the Signature portfolio match your search"
        noSearchText="Enter the address of a building in the Signature portfolio"
      />
      <div className="find-links">
        <p>How else can I find a building?</p>
        <Link href={"/landlords"}>Search by landlord</Link>
        <Link href={"/map"}>View all buildings on map</Link>
      </div>

      {isLoading && <Loading />}
      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}

      <SectionHeader className="landing-page-table-header">
        Building Table
      </SectionHeader>
      {data && (
        <>
          <p className="landing-page-table-context">
            There are <>{formatNumber(data.bldg_data.length)}</> buildings in
            the Signature Portfolio Dashboard.
          </p>
          <BuildingTable data={data.bldg_data} pagination={true} />
        </>
      )}
    </>
  );
};
