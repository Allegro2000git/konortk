import s from "./FilteredMovies.module.css";
import { useGetSortedMoviesQuery } from "@/shared/api/sharedApi";
import { useFilters } from "@/shared/hooks";
import { Filters } from "@/features/filtersAside/Filters";
import { MovieCard, Pagination } from "@/shared/components";
import Skeleton from "react-loading-skeleton";

export function FilteredMovies() {
  const { filters, updateFilters, resetFilters } = useFilters();

  const { data, isLoading } = useGetSortedMoviesQuery(filters);

  const handlePageChange = (page: number) => updateFilters({ page });

  return (
    <>
      <section className={s.container}>
        <Filters filters={filters} updateFilters={updateFilters} resetFilters={resetFilters} />
        <div className={s["filtered-wrapper"]}>
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => (
                <div key={`skeleton-${index}`}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(5, 1fr))",
                      gap: "1rem",
                    }}
                  >
                    {Array.from({ length: 4 }).map((_, index) => (
                      <div key={`movie-${index}`} style={{ marginBottom: "2rem" }}>
                        <Skeleton height={225} style={{ marginBottom: "1rem" }} />
                        <Skeleton width={100} height={20} />
                      </div>
                    ))}
                  </div>
                </div>
              ))
            : data?.results && data.results.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
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
