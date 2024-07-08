// import { AddressRecord } from "../../types/APIDataTypes";
import React from "react";
import { PageTitle } from "../../PageTitle/PageTitle";
import { LandlordSearch } from "../../AlgoliaSearch/AlgoliaSearch";
import { AllLandlordsTable } from "./AllLandlordsTable/AllLandlordsTable";
import { Link } from "@justfixnyc/component-library";
import "./style.scss";

export const NoLandlord: React.FC = () => {
  return (
    <>
      <PageTitle>Landlords</PageTitle>
      <LandlordSearch labelText="Search for landlord by name" />
      <div className="find-links">
        <p>Don't know the landlord's name?</p>
        <Link href={"/buildings"}>Search by building address</Link>
      </div>

      <h3>Landlord Table</h3>
      <AllLandlordsTable />
    </>
  );
};
