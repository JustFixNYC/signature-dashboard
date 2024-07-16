import { apiKeys, getColumnHeader } from "../../util/helpers";
import { FilterChip } from "./FilterChip/FilterChip";
import { ColumnFiltersState } from "@tanstack/react-table";
import { useState } from "react";

type FilterChipsProps = {
  columnFilters: ColumnFiltersState;
  removeFn: (id: string) => void;
};

const defaultFilterCount = 4;
export const FilterChips: React.FC<FilterChipsProps> = ({
  columnFilters,
  removeFn,
}) => {
  const [showAll, setShowAll] = useState(false);

  const filtersToShow = showAll
    ? columnFilters
    : columnFilters.slice(0, defaultFilterCount);

  const filterChipsToShow = filtersToShow.map((filter) => {
    return (
      <FilterChip
        key={filter.id}
        labelText={getColumnHeader(filter.id as apiKeys)}
        selected={true}
        removable={true}
        onClick={() => removeFn(filter.id)}
      />
    );
  });
  return (
    <>
      {filterChipsToShow}
      {columnFilters.length > defaultFilterCount && (
        <FilterChip
          key="show-more-less"
          labelText={showAll ? "Show Less" : "Show More"}
          selected={true}
          removable={true}
          onClick={() => {
            setShowAll(!showAll);
          }}
        />
      )}
    </>
  );
};
