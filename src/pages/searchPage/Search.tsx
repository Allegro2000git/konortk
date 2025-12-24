import { useSearchParams } from "react-router";
import { SearchInput } from "@/features/searchInput/SearchInput";
import { MovieCard } from "@/shared/components";
import s from "./Search.module.css";
import { useGetSearchMoviesInfiniteQuery } from "@/shared/api/sharedApi";
import { useEffect, useRef } from "react";
import Skeleton from "react-loading-skeleton";

export function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const { data, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetSearchMoviesInfiniteQuery({
    query,
    page: 1,
  });
  const loadMore = useRef<HTMLDivElement | null>(null);

  const handleNextPage = async () => {
    if (hasNextPage && !isFetchingNextPage) {
      await fetchNextPage();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetching) {
          handleNextPage();
        }
      },
      { threshold: 0.5 }
    );

    if (loadMore.current) {
      observer.observe(loadMore.current);
    }

    return () => {
      if (loadMore.current) {
        observer.unobserve(loadMore.current);
      }
    };
  }, [hasNextPage, isFetching, query]);

  const dataResults = data?.pages.flatMap((page) => page.results || []) ?? [];
  return (
    <div>
      <h2 className={s.title}>Search Results</h2>
      <SearchInput isSearchButtonActive={true} />

      {query ? (
        <>
          <h3 className={s["results-title"]}>Results for "{query}"</h3>
          <div className={s["search-page-wrapper"]}>
            {isFetching && dataResults.length === 0 ? (
              Array.from({ length: 20 }).map((_, index) => (
                <div key={`skeleton-${index}`}>
                  <Skeleton height={300} style={{ marginBottom: "1rem" }} />
                  <Skeleton width={100} height={20} />
                </div>
              ))
            ) : dataResults.length > 0 ? (
              <>
                {dataResults.map((movie, index) => (
                  <MovieCard key={`${movie.id} -${index}`} movie={movie} />
                ))}
                <div ref={loadMore} style={{ height: 20 }} />
              </>
            ) : (
              <p>No movies found</p>
            )}
          </div>
        </>
      ) : (
        <p className={s.enter}>Enter a movie title to start searching.</p>
      )}
    </div>
  );
}
