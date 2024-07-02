import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import JFCLLinkInternal from "../../JFCLLinkInternal";
import { PageTitle } from "../../PageTitle/PageTitle";

export const NoLender: React.FC = () => {
  return (
    <>
      <PageTitle>Lenders</PageTitle>
      <p>
        <JFCLLinkInternal href="lenders?lender=cpc">
          CPC Portfolio
        </JFCLLinkInternal>
      </p>
      <p>
        <JFCLLinkInternal href="lenders?lender=santander">
          Santander Portfolio
        </JFCLLinkInternal>
      </p>
      <h3>About lender portfolios</h3>
      <div style={{ width: "600px" }}>
        <p>
          Rent-regulated buildings in the former Signature Bank multifamily loan
          portfolio were broken into two joint venture vehicles. These pools are
          now administered by CPC & Santander. The FDIC oversees and holds a
          majority financial stake in both joint ventures.
        </p>
        <p>
          Landlords with rent-regulated properties financed by Signature Bank
          will have their portfolios entirely in either the CPC or Santander
          joint ventures. For landlords, CPC and Santander are their new lender.
        </p>
        <p>
          Lenders and are responsible for carrying out the{" "}
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
            various tools and incentives that lenders can use to intervene in
            issues that affect tenant stability & safety and responsible
            building operations
          </li>
        </ul>
      </div>
    </>
  );
};
