import s from "./Filters.module.css";
import { SelectFilters } from "@/shared/components/selectFilters/SelectFilters";
import { RatingBar } from "@/features/ratingBar/RatingBar";
import type { DiscoverMoviesParams, SortOption } from "@/shared/api/sharedApi.types";
import { useRatingDebounce } from "@/shared/hooks/useRatingDebounce";
import { GenresList } from "@/features/genresList/GenresList";
import { memo } from "react";

type Props = {
  filters: DiscoverMoviesParams;
  updateFilters: (updates: Partial<DiscoverMoviesParams>) => void;
  resetFilters: () => void;
};

export const Filters = memo(({ filters, updateFilters, resetFilters }: Props) => {
  const debouncedUpdateRating = useRatingDebounce((min: number, max: number) => {
    updateFilters({
      "vote_average.gte": min,
      "vote_average.lte": max,
    });
  }, 200);

  const handleSortChange = (sort_by: SortOption) => updateFilters({ sort_by, page: 1 });

  const handleRatingChange = (min: number, max: number) => {
    debouncedUpdateRating(min, max);
  };

  return (
    <aside className={s.filters}>
      <h3>Filter / Sort</h3>
      <SelectFilters value={filters?.sort_by || "popularity.desc"} onChange={handleSortChange} />
      <RatingBar
        minRating={filters["vote_average.gte"] || 0}
        maxRating={filters["vote_average.lte"] || 10}
        onRatingChange={handleRatingChange}
      />
      <section className={s.tags}>
        <GenresList filters={filters} updateFilters={updateFilters} />
        <button className={s.reset} onClick={resetFilters}>
          Reset filters
        </button>
      </section>
    </aside>
  );
});
