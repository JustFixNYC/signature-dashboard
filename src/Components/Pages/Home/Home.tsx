// import { AddressRecord } from "../../types/APIDataTypes";
import React from "react";
import "./style.scss";
import { PageTitle } from "../../PageTitle/PageTitle";
import JFCLLinkInternal from "../../JFCLLinkInternal";
import { useGetPortfolios } from "../../../api/hooks";
import { formatNumber } from "../../../util/helpers";
import { AddressSearch } from "../../AlgoliaSearch/AlgoliaSearch";
import { Link } from "@justfixnyc/component-library";

export const Home: React.FC = () => {
  const { data } = useGetPortfolios();

  const entirePortfolio = data?.find((obj) => obj.collection_slug === "all");
  const cpcPortfolio = data?.find((obj) => obj.collection_slug === "cpc");
  const santanderPortfolio = data?.find(
    (obj) => obj.collection_slug === "santander"
  );

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
              financed by Signature at the time of the crash. Track key
              indicators of physical and financial distress. See aggregate stats
              by landlord or lender.
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
            <div className="cards-container">
              <div className="card">
                <div className="card__title">Signature Portfolio</div>
                <div>{`${formatNumber(entirePortfolio?.landlords)} Landlords`}</div>
                <div>{`${formatNumber(entirePortfolio?.buildings)} Buildings`}</div>
                <JFCLLinkInternal
                  href="/entire-portfolio"
                  className="card__link"
                >
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
      </div>
    </>
  );
};
