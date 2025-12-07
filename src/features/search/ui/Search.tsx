import { useSearchParams } from "react-router";
import { useGetSearchMoviesQuery } from "@/shared/api/sharedApi";
import { SearchInput } from "@/shared/components/searchInput/SearchInput";
import { MovieCard } from "@/shared/components/movieCard";
import s from "./Search.module.css";

export function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const { data } = useGetSearchMoviesQuery({ query });

  return (
    <div>
      <h2 className={s.title}>Search Results</h2>
      <SearchInput isSearchButtonActive={true} />

      {query ? (
        <>
          <h3 className={s["results-title"]}>Results for "{query}"</h3>
          <div className={s["search-wrapper"]}>
            {data?.results && data.results.length > 0 ? (
              data.results.map((movie) => <MovieCard key={movie.id} movie={movie} />)
            ) : (
              <div>No movies found</div>
            )}
          </div>
        </>
      ) : (
        <div className={s.enter}>Enter a movie title to start searching.</div>
      )}
    </div>
  );
}
