import { useSearchParams } from "react-router";
import { useGetSearchMoviesQuery } from "@/shared/api/sharedApi";
import { SearchInput } from "@/shared/ui/searchInput/SearchInput";

export function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const { data } = useGetSearchMoviesQuery({ query, page: 1 });

  return (
    <div>
      <SearchInput isSearchButtonActive={true} />
      <div>
        {query ? (
          <>
            <h2>Results for "{query}"</h2>
            <>
              {data?.results &&
                data.results.map((movie) => (
                  <div key={movie.id}>
                    {movie.poster_path && (
                      <img
                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                        alt={movie.title}
                        style={{ height: 250, width: 200, objectFit: "cover", margin: 0, padding: 0 }}
                      />
                    )}
                    <h4 style={{ color: "white" }}>{movie.title}</h4>
                  </div>
                ))}
            </>
          </>
        ) : (
          <span>Enter a movie title to start searching.</span>
        )}
      </div>
    </div>
  );
}
