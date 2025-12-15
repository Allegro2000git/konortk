import { useSearchParams } from "react-router";
import { SearchInput } from "@/features/searchInput/SearchInput";
import { MovieCard } from "@/shared/components/movieCard";
import s from "./Search.module.css";
import { useGetSearchMoviesInfiniteQuery } from "@/shared/api/sharedApi";
import { useEffect, useRef } from "react";

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
            {dataResults && dataResults.length > 0 ? (
              dataResults.map((movie) => <MovieCard key={movie.id} movie={movie} />)
            ) : (
              <div>No movies found</div>
            )}
            <div ref={loadMore} style={{ height: 20 }} />
          </div>
        </>
      ) : (
        <div className={s.enter}>Enter a movie title to start searching.</div>
      )}
    </div>
  );
}
