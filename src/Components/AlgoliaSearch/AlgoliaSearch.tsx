import React from "react";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  Configure,
  UseSearchBoxProps,
  useHits,
} from "react-instantsearch";
import type { Hit as AlgoliaHit } from "instantsearch.js/es/types";
import { useNavigate } from "react-router-dom";
import { useSearchBox } from "react-instantsearch";
import { Dropdown } from "@justfixnyc/component-library";
import { gtmPush } from "../../google-tag-manager";
import { useAuth } from "../../auth";
// import algoliaIcon from "../assets/img/algolia.svg";

import "./styles.scss";
import classNames from "classnames";

const ALGOLIA_APP_ID = import.meta.env.VITE_ALGOLIA_APP_ID;
const ALGOLIA_SEARCH_KEY = import.meta.env.VITE_ALGOLIA_SEARCH_KEY;
const LANDLORD_INDEX_NAME = "signature_landlords";
const LANDLORD_ATTRIBUTE_NAME = "landlord_name";
const ADDRESS_INDEX_NAME = "signature_addresses";
const ADDRESS_ATTRIBUTE_NAME = "address";
const searchClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY);

/**
 * The maximum number of search results to show underneath the search bar
 * after a user as typed in an input.
 */
const SEARCH_RESULTS_LIMIT = 5;

type AttributeNameProps = {
  address?: string;
  bbl?: string;
  landlord_name?: string;
  landlord_slug?: string;
};

type SearchHitProps = AlgoliaHit<AttributeNameProps>;

type CustomSearchBoxProps = UseSearchBoxProps & {
  labelText: string;
  attributeName: keyof AttributeNameProps;
  toURL: (hit: SearchHitProps) => string;
  className?: string;
  placeholder?: string;
  noResultsText?: string;
  noSearchText?: string;
};

const CustomSearchBox: React.FC<CustomSearchBoxProps> = ({
  placeholder,
  noResultsText,
  noSearchText,
  labelText,
  className,
  attributeName,
  toURL,
  ...props
}) => {
  const { query, refine } = useSearchBox(props);
  const { hits } = useHits<SearchHitProps>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const noOptionsMessage = !query ? noSearchText : noResultsText;

  const selectOptions = !query
    ? undefined
    : hits.map((hit: SearchHitProps) => {
        return { label: hit[attributeName] as string, value: toURL(hit) };
      });

  return (
    <Dropdown
      labelText={labelText}
      onInputChange={(value: string) => refine(value)}
      // @ts-expect-error We need to update the JFCL onChange props to match react-select
      onChange={(selection) => {
        selection && navigate(selection.value);
        gtmPush("sig_search", { user_type: user });
      }}
      // @ts-expect-error We need to update the JFCL options props to allow undefined
      options={selectOptions}
      noOptionsMessage={() => noOptionsMessage}
      placeholder={placeholder}
      className={classNames("algolia-search", className)}
    />
  );
};

type AlgoliaSearchProps = Pick<
  CustomSearchBoxProps,
  | "labelText"
  | "attributeName"
  | "toURL"
  | "className"
  | "placeholder"
  | "noResultsText"
  | "noSearchText"
> & {
  indexName: string;
  hitsPerPage: number;
};

const AlgoliaSearch: React.FC<AlgoliaSearchProps> = ({
  indexName,
  attributeName,
  hitsPerPage,
  ...props
}) => {
  return ALGOLIA_APP_ID && ALGOLIA_SEARCH_KEY ? (
    <InstantSearch searchClient={searchClient} indexName={indexName}>
      <Configure
        analytics={false}
        hitsPerPage={hitsPerPage}
        attributesToSnippet={[attributeName]}
      />
      <CustomSearchBox attributeName={attributeName} {...props} />
    </InstantSearch>
  ) : (
    <React.Fragment />
  );
};

type SearchProps = Pick<
  CustomSearchBoxProps,
  "labelText" | "placeholder" | "noResultsText" | "noSearchText"
>;

export const LandlordSearch: React.FC<SearchProps> = (props) => (
  <AlgoliaSearch
    indexName={LANDLORD_INDEX_NAME}
    attributeName={LANDLORD_ATTRIBUTE_NAME}
    toURL={(hit) => `/landlords?landlord=${hit.landlord_slug}`}
    hitsPerPage={SEARCH_RESULTS_LIMIT}
    {...props}
  />
);

export const AddressSearch: React.FC<SearchProps> = (props) => (
  <AlgoliaSearch
    indexName={ADDRESS_INDEX_NAME}
    attributeName={ADDRESS_ATTRIBUTE_NAME}
    toURL={(hit) => `/buildings?bbl=${hit.bbl}`}
    hitsPerPage={SEARCH_RESULTS_LIMIT}
    {...props}
  />
);
