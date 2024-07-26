// import { AddressRecord } from "../../types/APIDataTypes";
import React from "react";
import "./style.scss";
import { PageTitle } from "../../PageTitle/PageTitle";
import JFCLLinkExternal from "../../JFCLLinkExternal";
import { SectionHeader } from "../../SectionHeader/SectionHeader";
import { Link } from "@justfixnyc/component-library";

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
        <p style={{ marginTop: "6px" }}>support@justfix.org</p>
        <JFCLLinkExternal
          href={"https://form.typeform.com/to/xWz7AK8h"}
          className="related-link"
        >
          Feedback form
        </JFCLLinkExternal>
      </div>

      <SectionHeader className="about__section-header">
        About the dashboard
      </SectionHeader>
      <div className="about__content" style={{ width: "600px" }}>
        <p>
          This project is a collaboration between JustFix and UNHP to track
          available public data on the rent-regulated portion of the former
          Signature Bank multifamily loan portfolio.{" "}
        </p>

        <p>
          The Signature Bank portfolio has always been an important one for
          tenants, organizers, advocates, and policymakers concerned about the
          state of NYC rental housing. This is even more true given{" "}
          <Link
            href="https://www.thecity.nyc/2023/05/03/signature-bank-mortgages-tenants-rent-stabilized-worst-landlords/"
            target="_blank"
          >
            the Bank's collapse
          </Link>{" "}
          and the subsequent{" "}
          <Link
            href="https://www.fdic.gov/about/strategic-plans/strategic/bankingindustry.html"
            target="_blank"
          >
            interventions by the FDIC
          </Link>
          .
        </p>

        <p>
          The Signature Data Dashboard aims to provide infrastructure that can
          serve as a shared foundation to measure the progress of this program.
        </p>
      </div>
      <SectionHeader className="about__section-header">
        Signature Bank collapse and the FDIC
      </SectionHeader>
      <div className="about__content" style={{ width: "600px" }}>
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
      <SectionHeader className="about__section-header">
        About the data
      </SectionHeader>
      <div className="about__content" style={{ width: "600px" }}>
        <p>
          Landlord portfolios are identified by cross referencing HPD
          Registration and ACRIS data; they are our best approximations based on
          the publicly available data. To provide input that can help us refine
          our landlord portfolio identification strategy, please fill out this{" "}
          <Link href={"https://form.typeform.com/to/xWz7AK8h"}>
            feedback form
          </Link>
          .
        </p>
        <p>
          All of the data comes from public sources and are automatically
          updated every day with the latest versions available from each source,
          however each source is updated by the agencies on a different
          schedule. We rely on the project{" "}
          <Link href="https://github.com/nycdb/nycdb" target="_blank">
            NYCDB
          </Link>{" "}
          for accessing all public data sources. Eviction filings data is from
          the New York State Office of Court Administration via the OCA Data
          Collective in collaboration with the{" "}
          <Link href="https://www.righttocounselnyc.org/" target="_blank">
            Right to Counsel Coalition
          </Link>
          .
        </p>
      </div>
    </>
  );
};
