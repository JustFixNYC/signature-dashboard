// import { AddressRecord } from "../../types/APIDataTypes";
import React from "react";
import { PageTitle } from "../../PageTitle/PageTitle";
import { LandlordSearch } from "../../AlgoliaSearch/AlgoliaSearch";
import { AllLandlordsTable } from "./AllLandlordsTable/AllLandlordsTable";
import { Link } from "@justfixnyc/component-library";
import "./style.scss";
import { SectionHeader } from "../../SectionHeader/SectionHeader";

export const NoLandlord: React.FC = () => {
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
      <AllLandlordsTable />
    </>
  );
};
