// import { AddressRecord } from "../../types/APIDataTypes";
import React from "react";
import "./style.scss";
import { PageTitle } from "../../PageTitle/PageTitle";
import JFCLLinkExternal from "../../JFCLLinkExternal";
import { SectionHeader } from "../../SectionHeader/SectionHeader";

export const About: React.FC = () => {
  return (
    <>
      <PageTitle>About</PageTitle>

      <SectionHeader className="about__section-header">Support</SectionHeader>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <JFCLLinkExternal
          href={"mailto:support@justfix.org"}
          className="related-link"
        >
          Contact us
        </JFCLLinkExternal>
        <p style={{ marginTop: "6px" }}>
          support@justfix.org
        </p>
        <JFCLLinkExternal
          href={"https://form.typeform.com/to/xWz7AK8h"}
          className="related-link"
        >
          Feedback form
        </JFCLLinkExternal>
      </div>
      
      <SectionHeader className="about__section-header">About the dashboard</SectionHeader>
      <div className="about__about-content" style={{ width: "600px" }}>
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
      <SectionHeader className="about__section-header">Signature Bank collapse and the FDIC</SectionHeader>
      <div className="about__signature-content" style={{ width: "600px" }}>
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
