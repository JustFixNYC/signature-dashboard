import React from "react";
import classNames from "classnames";
import { useGetPortfolios } from "../../api/hooks";
import { formatNumber } from "../../util/helpers";
import JFCLLinkInternal from "../JFCLLinkInternal";

import "./styles.scss";

type PortfolioCardsProps = {
  portfolios: ("all" | "cpc" | "santander")[];
  className?: string;
};

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
          <div>{`${formatNumber(entirePortfolio?.landlords)} Landlords`}</div>
          <div>{`${formatNumber(entirePortfolio?.buildings_agg)} Buildings`}</div>
          <JFCLLinkInternal href="/entire-portfolio" className="card__link">
            Entire Signature Portfolio
          </JFCLLinkInternal>
        </div>
      )}

      {portfolios.includes("cpc") && (
        <div className="card">
          <div className="card__title">CPC Loan Pool</div>
          <div>{`${formatNumber(cpcPortfolio?.landlords)} Landlords`}</div>
          <div>{`${formatNumber(cpcPortfolio?.buildings_agg)} Buildings`}</div>
          <JFCLLinkInternal href="/loan-pools?loan-pool=cpc" className="card__link">
            CPC Loan Pool
          </JFCLLinkInternal>
        </div>
      )}

      {portfolios.includes("santander") && (
        <div className="card">
          <div className="card__title">Santander Loan Pool</div>
          <div>{`${formatNumber(santanderPortfolio?.landlords)} Landlords`}</div>
          <div>{`${formatNumber(santanderPortfolio?.buildings_agg)} Buildings`}</div>
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
