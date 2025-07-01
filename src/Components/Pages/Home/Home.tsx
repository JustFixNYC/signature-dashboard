// import { AddressRecord } from "../../types/APIDataTypes";
import React from "react";
import "./style.scss";
import { PageTitle } from "../../PageTitle/PageTitle";
import { AddressSearch } from "../../AlgoliaSearch/AlgoliaSearch";
import { Link } from "@justfixnyc/component-library";
import { PortfolioCards } from "../../PortfolioCards/PortfolioCards";

export const Home: React.FC = () => {
  return (
    <>
      <div className="home-content">
        <div className="layout-two-col">
          <div className="col-1">
            <PageTitle>
              Find data on the rent-regulated portion of the former Signature
              Bank portfolio
            </PageTitle>
            <p>
              View, filter, and download data on every building that was
              financed by Signature Bank at the time of the crash. Track key
              indicators of physical and financial distress. See aggregate stats
              by landlord or loan pool.
            </p>
            <p className="org-credit">
              This project is a collaboration between{" "}
              <Link href="https://www.justfix.org/" target="_blank">
                JustFix
              </Link>{" "}
              and{" "}
              <Link href="https://unhp.org/" target="_blank">
                UNHP
              </Link>
              .
            </p>
            <h3 className="homepage-section-header">
              Search for a building by address
            </h3>
            <AddressSearch
              labelText="Search for a building by address"
              noResultsText="No buildings in the Signature portfolio match your search"
              noSearchText="Enter the address of a building in the Signature portfolio"
            />
          </div>
          <div className="col-2">
            <PortfolioCards
              portfolios={["all", "cpc", "santander"]}
              className="home-page__cards-container"
            />
          </div>
        </div>
      </div>
    </>
  );
};
