import s from "./FilteredMovies.module.css";
import { MovieCard } from "@/shared/components/movieCard";
import { Pagination } from "@/shared/components/pagination/Pagination";
import { useGetMovieListQuery, useGetSortedMoviesQuery } from "@/shared/api/sharedApi";
import { SelectFilters } from "@/shared/components/selectFilters/SelectFilters";
import { useUrlFilters } from "@/shared/hooks/useUrlFilters";
import type { SortOption } from "@/shared/api/sharedApi.types";

export function FilteredMovies() {
  const { filters, updateFilters } = useUrlFilters();

  const { data } = useGetSortedMoviesQuery({
    page: filters.page,
    sort_by: filters.sort_by,
    "vote_average.gte": filters["vote_average.gte"],
    "vote_average.lte": filters["vote_average.lte"],
    with_genres: filters.with_genres,
  });
  const { data: list } = useGetMovieListQuery();

  const handlePageChange = (page: number) => updateFilters({ page });

  const handleSortChange = (sort_by: SortOption) => updateFilters({ sort_by, page: 1 });

  return (
    <>
      <section className={s.container}>
        <aside className={s.filters}>
          <h3>Filter / Sort</h3>
          <SelectFilters value={filters?.sort_by || "popularity.desc"} onChange={handleSortChange} />
          <div className={s.rating}>
            <span>Rating</span>
            <span>{`0.0 - 10.0`}</span>
          </div>
          <section className={s.tags}>
            {list &&
              list.genres.map((tag) => (
                <button className={s.tag} key={tag.id}>
                  {tag.name}
                </button>
              ))}
          </section>
        </aside>
        <div className={s["filtered-wrapper"]}>
          {data?.results && data.results.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        </div>
      </section>
      <Pagination
        currentPage={filters.page || 1}
        setCurrentPage={handlePageChange}
        pagesCount={data?.total_pages || 1}
      />
    </>
  );
}
