import s from "./Filters.module.css";
import { SelectFilters } from "@/shared/components/selectFilters/SelectFilters";
import { RatingBar } from "@/features/ratingBar/RatingBar";
import { useGetMovieListQuery } from "@/shared/api/sharedApi";
import type { DiscoverMoviesParams, SortOption } from "@/shared/api/sharedApi.types";

type Props = {
  filters: DiscoverMoviesParams;
  updateFilters: (updates: Partial<DiscoverMoviesParams>) => void;
  resetFilters: () => void;
};

export const Filters = ({ filters, updateFilters, resetFilters }: Props) => {
  const { data: list } = useGetMovieListQuery();

  const handleGenreClick = (genreId: number) => {
    const currentGenres = filters.with_genres ? filters.with_genres.split(",").map((el) => Number(el)) : [];

    const newGenres = currentGenres.includes(genreId)
      ? currentGenres.filter((id) => id !== genreId)
      : [...currentGenres, genreId];

    updateFilters({
      with_genres: newGenres.length > 0 ? newGenres.join(",") : undefined,
    });
  };

  const handleSortChange = (sort_by: SortOption) => updateFilters({ sort_by, page: 1 });

  const handleRatingChange = (min: number, max: number) => {
    updateFilters({
      "vote_average.gte": min,
      "vote_average.lte": max,
    });
  };

  return (
    <aside className={s.filters}>
      <h3>Filter / Sort</h3>
      <SelectFilters value={filters?.sort_by || "popularity.desc"} onChange={handleSortChange} />
      <RatingBar
        minRating={filters["vote_average.gte"]!}
        maxRating={filters["vote_average.lte"]!}
        onRatingChange={handleRatingChange}
      />
      <section className={s.tags}>
        {list &&
          list.genres.map((tag) => {
            const isSelected = filters.with_genres
              ? filters.with_genres
                  .split(",")
                  .map((el) => Number(el))
                  .includes(tag.id)
              : false;

            return (
              <button
                className={`${s.tag} ${isSelected ? s.selected : ""}`}
                key={tag.id}
                onClick={() => handleGenreClick(tag.id)}
              >
                {tag.name}
              </button>
            );
          })}
        <button className={s.reset} onClick={resetFilters}>
          Reset filters
        </button>
      </section>
    </aside>
  );
};
