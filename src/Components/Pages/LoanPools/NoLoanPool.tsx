import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import { PageTitle } from "../../PageTitle/PageTitle";
import { PortfolioCards } from "../../PortfolioCards/PortfolioCards";
import { SectionHeader } from "../../SectionHeader/SectionHeader";

export const NoLoanPool: React.FC = () => {
  return (
    <>
      <PageTitle>Loan pools</PageTitle>
      <PortfolioCards portfolios={["cpc", "santander"]} />
      <SectionHeader className="loan-pools-page__section-header">
        About loan pools
      </SectionHeader>
      <div style={{ width: "600px" }}>
        <p>
          Rent-regulated buildings in the former Signature Bank multifamily loan
          portfolio were broken into two joint venture vehicles. These pools are
          now administered by{" "}
          <Link to="/loan-pools?loan-pool=cpc">
            Community Preservation Corporation (CPC)
          </Link>{" "}
          and <Link to="/loan-pools?loan-pool=santander">Santander Bank</Link>.
          The FDIC oversees and holds a majority financial stake in both joint
          ventures.
        </p>
        <p>
          Landlords with rent-regulated properties financed by Signature Bank
          will have their portfolios entirely in either the CPC or Santander
          Bank joint ventures. For landlords, CPC and Santander are their new
          mortgage holders.
        </p>
        <p>
          Mortgage holders are responsible for carrying out the{" "}
          <Link
            to="https://www.fdic.gov/buying/historical/structured/documents.html"
            target="_blank"
          >
            operating agreements (rows 37-39)
          </Link>{" "}
          set out by the FDIC. These agreements include:
        </p>
        <ul>
          <li>regular loan servicing</li>
          <li>asset management</li>
          <li>
            various tools and incentives that mortgage holders can use to
            intervene in issues that affect tenant stability & safety and
            responsible building operations
          </li>
        </ul>
      </div>
    </>
  );
};
