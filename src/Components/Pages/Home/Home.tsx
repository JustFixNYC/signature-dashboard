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
  const cpcPortfolio = data?.find((obj) => obj.collection_slug === "cpc");
  const santanderPortfolio = data?.find((obj) => obj.collection_slug === "cpc");

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

          <div className="cards-container">
            <div className="card">
              <div className="card__title">Signature Portfolio</div>
              <div>{`${formatNumber(entirePortfolio?.landlords)} Landlords`}</div>
              <div>{`${formatNumber(entirePortfolio?.buildings)} Buildings`}</div>
              <JFCLLinkInternal href="/entire-portfolio" className="card__link">
                Entire Signature Portfolio
              </JFCLLinkInternal>
            </div>

            <div className="card">
              <div className="card__title">CPC Portfolio</div>
              <div>{`${formatNumber(cpcPortfolio?.landlords)} Landlords`}</div>
              <div>{`${formatNumber(cpcPortfolio?.buildings)} Buildings`}</div>
              <JFCLLinkInternal
                href="/lenders?lender=cpc"
                className="card__link"
              >
                CPC Portfolio
              </JFCLLinkInternal>
            </div>

            <div className="card">
              <div className="card__title">Santander Portfolio</div>
              <div>{`${formatNumber(santanderPortfolio?.landlords)} Landlords`}</div>
              <div>{`${formatNumber(santanderPortfolio?.buildings)} Buildings`}</div>
              <JFCLLinkInternal
                href="/lenders?lender=santander"
                className="card__link"
              >
                Santander Portfolio
              </JFCLLinkInternal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
