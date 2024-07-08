// import { AddressRecord } from "../../types/APIDataTypes";
import React from "react";
import "./style.scss";
import { PageTitle } from "../../PageTitle/PageTitle";
import JFCLLinkInternal from "../../JFCLLinkInternal";
import { useGetPortfolios } from "../../../api/hooks";
import { formatNumber } from "../../../util/helpers";
import { AddressSearch } from "../../AlgoliaSearch/AlgoliaSearch";

export const Home: React.FC = () => {
  const { data } = useGetPortfolios();

  const entirePortfolio = data?.find((obj) => obj.collection_slug === "all");

  return (
    <>
      <PageTitle>Signature Portfolio Dashboard</PageTitle>
      <div style={{ width: "568px" }}>
        <p>
          This project is a collaboration between JustFix and UNHP to track
          available public data on the rent-regulated portion of the former
          Signature Bank multifamily loan portfolio.
        </p>

        <div style={{ width: "fit-content" }}>
          <h3 className="homepage-section-header">Search building</h3>
          <AddressSearch
            labelText="Find a building in the Signature portfolio by entering the address"
            noResultsText="No buildings in the Signature portfolio match your search."
          />
          <h3 className="homepage-section-header">
            Learn about the entire Signature Portfolio
          </h3>
          <p className="homepage-copy">
            See aggregate stats on all{" "}
            {!!entirePortfolio && formatNumber(entirePortfolio?.buildings)}{" "}
            buildings on the dashboard.
          </p>
          <JFCLLinkInternal href="/entire-portfolio">
            Entire Signature Portfolio
          </JFCLLinkInternal>
        </div>
      </div>
    </>
  );
};
