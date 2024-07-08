import React from "react";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  Configure,
  Snippet,
  UseSearchBoxProps,
  useHits,
  UseHitsProps,
} from "react-instantsearch";
import type { Hit as AlgoliaHit } from "instantsearch.js/es/types";
import { Link } from "react-router-dom";
import { useSearchBox } from "react-instantsearch";
import FocusTrap from "focus-trap-react";
import classNames from "classnames";
// import algoliaIcon from "../assets/img/algolia.svg";

import "./styles.scss";
import { TextInput } from "@justfixnyc/component-library";

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

type CustomSearchBoxProps = UseSearchBoxProps & {
  labelText: string;
  className?: string;
  placeholder?: string;
} & Pick<CustomHitsProps, "toURL" | "attributeName">;

const CustomSearchBox: React.FC<CustomSearchBoxProps> = ({
  attributeName,
  toURL,
  placeholder,
  labelText,
  className,
  ...props
}) => {
  const { query, refine } = useSearchBox(props);

  //   const { status } = useInstantSearch();
  const [inputValue, setInputValue] = React.useState(query);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [searchIsInFocus, setSearchFocus] = React.useState(false);

  //   const isSearchStalled = status === "stalled";

  function setQuery(newQuery: string) {
    setInputValue(newQuery);
    refine(newQuery);
  }

  return (
    <FocusTrap
      active={searchIsInFocus}
      focusTrapOptions={{
        clickOutsideDeactivates: true,
        onDeactivate: () => setSearchFocus(false),
      }}
    >
      <div
        className={classNames("AlgoliaSearch", className)}
        onClick={() => setSearchFocus(true)}
      >
        <form noValidate action="" role="search">
          <TextInput
            ref={inputRef}
            labelText={labelText}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            className="form-input"
            id="searchbox-input"
            type="search"
            placeholder={placeholder}
            value={inputValue}
            onChange={(event) => {
              setQuery(event.currentTarget.value);
              setSearchFocus(true);
            }}
          />
        </form>

        {searchIsInFocus && (
          <>
            <div
              // hide the search results when the user is not currently searching a name here
              role="region"
              aria-live="polite"
              aria-atomic={true}
            >
              <CustomHits attributeName={attributeName} toURL={toURL} />
            </div>
            {/* <div className="search-by is-pulled-right">
              <img width="140" height="20" alt="Algolia" src={algoliaIcon} />
            </div> */}
          </>
        )}
      </div>
    </FocusTrap>
  );
};

const ScreenReaderAnnouncementOfSearchHits: React.FC<{
  numberOfHits: number;
}> = ({ numberOfHits }) => (
  <p className="text-assistive">
    {numberOfHits} {numberOfHits == 1 ? "search result" : "search results"}.{" "}
    {numberOfHits > 0 ? (
      <>Use the tab key to navigate. Press the enter key to select.</>
    ) : (
      <>Use the escape key to quit searching.</>
    )}
  </p>
);

type LandlordHitProps = AlgoliaHit<{
  landlord_name: string;
  landlord_slug: string;
}>;

type AddressHitProps = AlgoliaHit<{
  address: string;
  bbl: string;
}>;

type CustomHitsProps = UseHitsProps<LandlordHitProps | AddressHitProps> & {
  attributeName: keyof LandlordHitProps | keyof AddressHitProps;
  toURL: (hit: Partial<LandlordHitProps & AddressHitProps>) => string;
};

const CustomHits: React.FC<CustomHitsProps> = ({
  attributeName,
  toURL,
  ...props
}) => {
  const { hits } = useHits(props);
  const numberOfHits = Math.min(hits ? hits.length : 0, SEARCH_RESULTS_LIMIT);

  return (
    <>
      {hits && numberOfHits > 0 ? (
        <div className="algolia__suggests">
          {hits
            .map((hit: LandlordHitProps | AddressHitProps, index: number) => (
              <Link
                key={index}
                to={toURL(hit)}
                className="algolia__item"
                aria-hidden="true" // Make sure search results don't get announced until user is focused on them
              >
                <div className="result__snippet">
                  <Snippet attribute={[attributeName]} hit={hit} />
                </div>
              </Link>
            ))
            .slice(0, SEARCH_RESULTS_LIMIT)}
        </div>
      ) : (
        <div className="label">
          <br />
          No landlords in the Signature portfolio match your search.
        </div>
      )}
      <ScreenReaderAnnouncementOfSearchHits numberOfHits={numberOfHits} />
    </>
  );
};

type AlgoliaSearchProps = Pick<
  CustomSearchBoxProps,
  "labelText" | "attributeName" | "toURL" | "className" | "placeholder"
> & {
  indexName: string;
  hitsPerPage: number;
};

const AlgoliaSearch: React.FC<AlgoliaSearchProps> = ({
  indexName,
  attributeName,
  toURL,
  placeholder,
  labelText,
  hitsPerPage,
}) => {
  return ALGOLIA_APP_ID && ALGOLIA_SEARCH_KEY ? (
    <InstantSearch searchClient={searchClient} indexName={indexName}>
      <Configure
        analytics={false}
        hitsPerPage={hitsPerPage}
        attributesToSnippet={[attributeName]}
      />
      <CustomSearchBox
        attributeName={attributeName}
        toURL={toURL}
        placeholder={placeholder}
        labelText={labelText}
      />
    </InstantSearch>
  ) : (
    <React.Fragment />
  );
};

type SearchProps = Pick<CustomSearchBoxProps, "labelText" | "placeholder">;

export const LandlordSearch: React.FC<SearchProps> = ({
  placeholder,
  labelText,
}) => (
  <AlgoliaSearch
    indexName={LANDLORD_INDEX_NAME}
    attributeName={LANDLORD_ATTRIBUTE_NAME}
    toURL={(hit) => `/landlords?landlord=${hit.landlord_slug}`}
    placeholder={placeholder}
    labelText={labelText}
    hitsPerPage={5}
  />
);

export const AddressSearch: React.FC<SearchProps> = ({
  placeholder,
  labelText,
}) => (
  <AlgoliaSearch
    indexName={ADDRESS_INDEX_NAME}
    attributeName={ADDRESS_ATTRIBUTE_NAME}
    toURL={(hit) => `/buildings?bbl=${hit.bbl}`}
    placeholder={placeholder}
    labelText={labelText}
    hitsPerPage={5}
  />
);
