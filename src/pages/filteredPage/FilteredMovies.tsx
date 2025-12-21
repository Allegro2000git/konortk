import s from "./FilteredMovies.module.css";
import { MovieCard } from "@/shared/components/movieCard";
import { Pagination } from "@/shared/components/pagination/Pagination";
import { useGetSortedMoviesQuery } from "@/shared/api/sharedApi";
import { useFilters } from "@/shared/hooks/useFilters";
import { Filters } from "@/features/filtersAside/Filters";

export function FilteredMovies() {
  const { filters, updateFilters, resetFilters } = useFilters();

  const { data, isError } = useGetSortedMoviesQuery(filters);

  const handlePageChange = (page: number) => updateFilters({ page });

  if (isError) {
    return <div>Some error occurred...</div>;
  }
  return (
    <>
      <section className={s.container}>
        <Filters filters={filters} updateFilters={updateFilters} resetFilters={resetFilters} />
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
