import React from "react";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  Configure,
  Snippet,
  UseSearchBoxProps,
  useHits,
  UseHitsProps,
  //   useInstantSearch,
  //   connectSearchBox,
  //   connectHits,
} from "react-instantsearch";
import type { Hit as AlgoliaHit } from "instantsearch.js/es/types";
import { Link } from "react-router-dom";
// import algoliaIcon from "../assets/img/algolia.svg";

import FocusTrap from "focus-trap-react";
import "./styles.scss";

const ALGOLIA_APP_ID = import.meta.env.VITE_ALGOLIA_APP_ID;
const ALGOLIA_SEARCH_KEY = import.meta.env.VITE_ALGOLIA_SEARCH_KEY;
const ALGOLIA_INDEX_NAME = "signature_landlords";
const ALGOLIA_ATTRIBUTE_NAME = "landlord_name";
const searchClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY);

/**
 * The maximum number of search results to show underneath the search bar
 * after a user as typed in an input.
 */
const SEARCH_RESULTS_LIMIT = 5;

import { useSearchBox } from "react-instantsearch";

function CustomSearchBox(props: UseSearchBoxProps) {
  const { query, refine } = useSearchBox(props);

  //   const { status } = useInstantSearch();
  const [inputValue, setInputValue] = React.useState(query);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [searchIsInFocus, setSearchFocus] = React.useState(true);
  const userIsCurrentlySearching = searchIsInFocus; //&& !!currentRefinement;

  //   const isSearchStalled = status === "stalled";

  function setQuery(newQuery: string) {
    setInputValue(newQuery);
    refine(newQuery);
  }

  return (
    <FocusTrap
      active={userIsCurrentlySearching}
      focusTrapOptions={{
        clickOutsideDeactivates: true,
        onDeactivate: () => setSearchFocus(false),
      }}
    >
      <div
        className="AlgoliaSearch"
        onFocus={() => setSearchFocus(true)}
        onClick={() => setSearchFocus(true)}
      >
        <form noValidate action="" role="search">
          <input
            ref={inputRef}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            className="form-input"
            type="search"
            placeholder={"Search landlords"}
            aria-label={"Search by a landlord's name"}
            value={inputValue}
            onChange={(event) => {
              setQuery(event.currentTarget.value);
              setSearchFocus(true);
              console.log(query);
            }}
          />
        </form>

        {userIsCurrentlySearching && (
          <>
            <div
              // hide the search results when the user is not currently searching a name here
              role="region"
              aria-live="polite"
              aria-atomic={true}
            >
              <CustomHits />
            </div>
            {/* <div className="search-by is-pulled-right">
              <img width="140" height="20" alt="Algolia" src={algoliaIcon} />
            </div> */}
          </>
        )}
      </div>
    </FocusTrap>
  );
}

// const SearchBox = ({ currentRefinement, refine }: SearchBoxProvided) => {
//   const [searchIsInFocus, setSearchFocus] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const userIsCurrentlySearching = searchIsInFocus && !!currentRefinement;

//   useEffect(() => {
//     if (searchQuery.length >= SEARCH_INPUT_MINIMUM_LENGTH) {
//       refine(searchQuery);
//     } else {
//       refine("");
//     }
//   }, [searchQuery, refine]);
//   return (
//     <FocusTrap
//       active={userIsCurrentlySearching}
//       focusTrapOptions={{
//         clickOutsideDeactivates: true,
//         onDeactivate: () => setSearchFocus(false),
//       }}
//     >
//       <div
//         className="LandlordSearch"
//         onFocus={() => setSearchFocus(true)}
//         onClick={() => setSearchFocus(true)}
//       >
//         <form noValidate action="" role="search">
//           <input
//             className="form-input"
//             type="search"
//             placeholder={"Search landlords"}
//             aria-label={"Search by a landlord's name"}
//             value={searchQuery}
//             onChange={(event) => {
//               setSearchQuery(event.currentTarget.value);
//               setSearchFocus(true);
//             }}
//           />
//         </form>

//         {userIsCurrentlySearching && (
//           <>
//             <div
//               // hide the search results when the user is not currently searching a name here
//               role="region"
//               aria-live="polite"
//               aria-atomic={true}
//             >
//               <CustomHits />
//             </div>
//             <div className="search-by is-pulled-right">
//               <img width="140" height="20" alt="Algolia" src={algoliaIcon} />
//             </div>
//           </>
//         )}
//       </div>
//     </FocusTrap>
//   );
// };

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

type HitProps = AlgoliaHit<{
  landlord_name: string;
  landlord_slug: string;
}>;

const CustomHits = (props: UseHitsProps<HitProps>) => {
  const { hits } = useHits(props);
  const numberOfHits = Math.min(hits ? hits.length : 0, SEARCH_RESULTS_LIMIT);

  return (
    <>
      {hits && numberOfHits > 0 ? (
        <div className="algolia__suggests">
          {hits
            .map((hit: HitProps) => (
              <Link
                key={hit.landlord_slug}
                to={`/landlords?landlord=${hit.landlord_slug}`}
                className="algolia__item"
                aria-hidden="true" // Make sure search results don't get announced until user is focused on them
              >
                <div className="result__snippet">
                  <Snippet attribute={ALGOLIA_ATTRIBUTE_NAME} hit={hit} />
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

// const CustomSearchBox = connectSearchBox(SearchBox);
// const CustomHits = connectHits(SearchHits);

const AlgoliaSearch = () => {
  return ALGOLIA_APP_ID && ALGOLIA_SEARCH_KEY ? (
    <InstantSearch searchClient={searchClient} indexName={ALGOLIA_INDEX_NAME}>
      <Configure
        analytics={false}
        hitsPerPage={SEARCH_RESULTS_LIMIT}
        attributesToSnippet={[ALGOLIA_ATTRIBUTE_NAME]}
      />
      <CustomSearchBox />
    </InstantSearch>
  ) : (
    <React.Fragment />
  );
};

export default AlgoliaSearch;
