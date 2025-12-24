import { SearchInput } from "@/features/searchInput/SearchInput";
import { MovieSection } from "@/features/movieSections/MovieSection";
import s from "./Main.module.css";
import { useCategoryMovies, useMovieBackdropPath } from "@/shared/hooks";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function Main() {
  const { data: popularData, isLoading: popularLoading } = useCategoryMovies("popular", { page: 1 });
  const { data: topRatedData, isLoading: topRatedLoading } = useCategoryMovies("top_rated", { page: 1 });
  const { data: nowPlayingData, isLoading: nowPlayingLoading } = useCategoryMovies("upcoming", { page: 1 });
  const { data: upcomingData, isLoading: upcomingLoading } = useCategoryMovies("now_playing", { page: 1 });
  const movieBackdropPath = useMovieBackdropPath(popularData);

  const sections = [
    {
      title: "Popular Movies",
      movies: popularData?.results?.slice(0, 6) || [],
      category: "popular",
    },
    {
      title: "Top Rated Movies",
      movies: topRatedData?.results?.slice(0, 6) || [],
      category: "top-rated",
    },
    {
      title: "Upcoming Movies",
      movies: upcomingData?.results?.slice(0, 6) || [],
      category: "upcoming",
    },
    {
      title: "Now Playing Movies",
      movies: nowPlayingData?.results?.slice(0, 6) || [],
      category: "now-playing",
    },
  ];

  const isSectionLoading = popularLoading || topRatedLoading || nowPlayingLoading || upcomingLoading;

  return (
    <>
      <div
        className={s.cover}
        style={{
          backgroundImage: movieBackdropPath
            ? `linear-gradient(rgba(4, 21, 45, 0) 5%, rgb(18, 18, 18) 96%), url(${movieBackdropPath})`
            : "",
        }}
      >
        <div className={s["cover-container"]}>
          {isSectionLoading ? (
            <>
              <Skeleton width={200} height={40} />
              <Skeleton width={300} height={24} style={{ margin: "1rem 0" }} />
              <Skeleton width={500} height={40} />
            </>
          ) : (
            <>
              <h1>Welcome</h1>
              <h3 className={s.subtitle}>Browse highlighted titles from TMDB</h3>
              <SearchInput isSearchButtonActive={true} />
            </>
          )}
        </div>
      </div>
      <section className={s["cover-container"]}>
        {isSectionLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <div key={`skeleton-${index}`}>
                <Skeleton width={200} height={28} style={{ margin: "2rem 0" }} />

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                    gap: "1rem",
                  }}
                >
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div key={`movie-${index}`} style={{ marginBottom: "2rem" }}>
                      <Skeleton height={250} style={{ marginBottom: "1rem" }} />
                      <Skeleton width={125} height={20} />
                    </div>
                  ))}
                </div>
              </div>
            ))
          : sections.map((section, index) => (
              <MovieSection key={index} title={section.title} movies={section.movies} category={section.category} />
            ))}
      </section>
    </>
  );
}
