// import { AddressRecord } from "../../types/APIDataTypes";
import React from "react";
import { PageTitle } from "../../PageTitle/PageTitle";
import { AllLandlordsTable } from "./AllLandlordsTable/AllLandlordsTable";

export const NoLandlord: React.FC = () => {
  return (
    <>
      <PageTitle>Landlords</PageTitle>
      <AllLandlordsTable />
    </>
  );
};
