// import { AddressRecord } from "../../types/APIDataTypes";
import React from "react";
import { PageTitle } from "../../PageTitle/PageTitle";
import { LandlordSearch } from "../../AlgoliaSearch/AlgoliaSearch";
import { AllLandlordsTable } from "./AllLandlordsTable/AllLandlordsTable";
import { Link } from "@justfixnyc/component-library";
import "./style.scss";
import { SectionHeader } from "../../SectionHeader/SectionHeader";
import { useGetAllLandlords } from "../../../api/hooks";
import { Loading } from "../../Loading/Loading";
import { formatNumber } from "../../../util/helpers";

export const NoLandlord: React.FC = () => {
  const { data, error, isLoading } = useGetAllLandlords();

  return (
    <>
      <PageTitle>Landlords</PageTitle>
      <LandlordSearch
        labelText="Search for landlord by name"
        noResultsText="No landlords in the Signature portfolio match your search."
        noSearchText="Enter the name of a landlord in the Signature portfolio"
      />
      <div className="find-links">
        <p>Don't know the landlord's name?</p>
        <Link href={"/buildings"}>Search by building address</Link>
      </div>

      <SectionHeader className="landing-page-table-header">
        Landlord Table
      </SectionHeader>

      {isLoading && <Loading />}
      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
      {data && (
        <>
          <p className="landing-page-table-context">
            There are {formatNumber(data.length) as string} landlords with
            rent-regulated properties financed by Signature Bank. Each one will
            have their portfolios entirely in either the Community Preservation
            Corporation (CPC) or Santander Bank joint ventures.
          </p>
          <AllLandlordsTable data={data} />
        </>
      )}
    </>
  );
};
