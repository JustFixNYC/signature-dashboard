import { Button } from "@justfixnyc/component-library";
import { apiKeys, getColumnHeader } from "../../util/helpers";
import { FilterChip } from "./FilterChip/FilterChip";
import { ColumnFiltersState } from "@tanstack/react-table";
import { useRef, useState } from "react";

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
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  // const filtersToShow = showAll
  //   ? columnFilters
  //   : columnFilters.slice(0, defaultFilterCount);

  const filterChipsToShow = columnFilters.map((filter, i) => {
    return (
      <FilterChip
        key={filter.id}
        labelText={getColumnHeader(filter.id as apiKeys)}
        selected={true}
        removable={true}
        ref={ref => itemsRef.current[i] = ref }
        onClick={() => removeFn(filter.id)}
      />
    );
  });
  // if (itemsRef.current[0]) {
  //   console.log('~~', itemsRef.current[0].getBoundingClientRect().top)
  // }
  const tops = {};

  itemsRef.current.forEach((el, i) => {
    const top = el?.getBoundingClientRect().top;
    if (top) {
      const count = Object.keys(tops).length;
      console.log('~~~', {count, exists: tops[top]})
      if (!tops[top] && count >= 2) {
        setShowAll(true);
      } else {
        tops[top] = true;
      }
    }

    // console.log('~~', el?.getBoundingClientRect().top)
})

  // const totalWidth = itemsRef.current.reduce((total, curr) => {
  //   if (!curr) return total;
  //   return total += curr.offsetWidth + parseInt(curr.style.marginRight);
  // }, 0)
  return (
    <>
      {filterChipsToShow}
      {columnFilters.length > defaultFilterCount && (
        <Button
          key="show-more-less"
          labelText={showAll ? "Show Less" : "Show More"}
          variant="secondary"
          size="small"
          onClick={() => {
            setShowAll(!showAll);
          }}
        />
      )}
    </>
  );
};
