import React from "react";
import classNames from "classnames";
import { useGetPortfolios } from "../../api/hooks";
import { APIPortfolioData } from "../../types/APIDataTypes";
import { formatNumber } from "../../util/helpers";
import JFCLLinkInternal from "../JFCLLinkInternal";

import "./styles.scss";

type PortfolioCardsProps = {
  portfolios: ("all" | "cpc" | "santander")[];
  className?: string;
};

const PortfolioStats = ({ data }: { data?: APIPortfolioData }) => (
  <>
    <div>{data ? `${formatNumber(data?.landlords)} Landlords` : <br />}</div>
    <div>
      {data ? `${formatNumber(data?.buildings_agg)} Buildings` : <br />}
    </div>
  </>
);

export const PortfolioCards: React.FC<PortfolioCardsProps> = ({
  portfolios,
  className,
}) => {
  const { data } = useGetPortfolios();

  const entirePortfolio = data?.find((obj) => obj.collection_slug === "all");
  const cpcPortfolio = data?.find((obj) => obj.collection_slug === "cpc");
  const santanderPortfolio = data?.find(
    (obj) => obj.collection_slug === "santander"
  );

  return (
    <div className={classNames("cards-container", className)}>
      {portfolios.includes("all") && (
        <div className="card">
          <div className="card__title">Signature Portfolio</div>
          <PortfolioStats data={entirePortfolio} />
          <JFCLLinkInternal href="/entire-portfolio" className="card__link">
            Entire Signature Portfolio
          </JFCLLinkInternal>
        </div>
      )}

      {portfolios.includes("cpc") && (
        <div className="card">
          <div className="card__title">CPC Loan Pool</div>
          <PortfolioStats data={cpcPortfolio} />
          <JFCLLinkInternal
            href="/loan-pools?loan-pool=cpc"
            className="card__link"
          >
            CPC Loan Pool
          </JFCLLinkInternal>
        </div>
      )}

      {portfolios.includes("santander") && (
        <div className="card">
          <div className="card__title">Santander Loan Pool</div>
          <PortfolioStats data={santanderPortfolio} />
          <JFCLLinkInternal
            href="/loan-pools?loan-pool=santander"
            className="card__link"
          >
            Santander Loan Pool
          </JFCLLinkInternal>
        </div>
      )}
    </div>
  );
};
