// import { AddressRecord } from "../../types/APIDataTypes";
import React from "react";
import "./style.scss";

export const About: React.FC = () => {
  return (
    <>
      <h2>About the dashboard</h2>
      <div style={{ width: "600px" }}>
        <p>
          This project is a collaboration between JustFix and UNHP to track
          available public data on the rent-regulated portion of the former
          Signature Bank multifamily loan portfolio.{" "}
        </p>

        <p>
          The Signature Bank portfolio has always been an important one for
          tenants, organizers, advocates, and policymakers concerned about the
          state of NYC rental housing. This is even more true given the Bank's
          collapse and the subsequent interventions by the FDIC.
        </p>

        <p>
          The Signature Data Dashboard aims to provide infrastructure that can
          serve as a shared foundation to measure the progress of this program.
        </p>
      </div>
      <h2>Signature Bank collapse and the FDIC</h2>
      <div style={{ width: "600px" }}>
        <p>
          Before its collapse in March 2023, Signature Bank was one of the most
          significant lenders to multifamily rental housing in New York City,
          with a portfolio of close to 3,000 properties, almost 80% of which
          were likely to contain rent-stabilized units.
        </p>

        <p>
          Following the Bank's closure, the portfolio was placed into
          receivership and held by the Federal Deposit Insurance Corporation
          (FDIC) until early 2024, when the loans on rent-regulated housing were
          transferred into two joint ventures, administered by Community
          Preservation Corporation (CPC) and Santander Bank.
        </p>

        <p>
          The FDIC has tasked these joint ventures to undertake an ambitious
          post-disposition program, requiring that CPC and Santander not only
          service and manage the loans, but also ensure that tenant stability,
          building safety, and responsible operations & ownership are
          prioritized, in accordance with the FDIC’s statutory requirements
          outlined in the FDIC Improvement Act of 1991.
        </p>
      </div>
    </>
  );
};
