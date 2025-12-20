import { SearchInput } from "@/features/searchInput/SearchInput";
import { MovieSection } from "@/features/main/ui/movieSections/MovieSection";
import s from "./Main.module.css";
import { getMovieBackdropPath } from "@/features/movieBackdropPath/getMovieBackdropPath";
import { useCategoryMovies } from "@/shared/hooks/useCategoryMovies";

export function Main() {
  const { data: popularData, isLoading, isError } = useCategoryMovies("popular", { page: 1 });
  const { data: topRatedData } = useCategoryMovies("top_rated", { page: 1 });
  const { data: nowPlayingData } = useCategoryMovies("upcoming", { page: 1 });
  const { data: upcomingData } = useCategoryMovies("now_playing", { page: 1 });
  const movieBackdropPath = getMovieBackdropPath(popularData);

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

  if (isError) {
    return <div>Some error occurred...</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
          <h1>Welcome</h1>
          <h3 className={s.subtitle}>Browse highlighted titles from TMDB</h3>
          <SearchInput isSearchButtonActive={true} />
        </div>
      </div>
      <section className={s["cover-container"]}>
        {sections.map((section, index) => (
          <MovieSection key={index} title={section.title} movies={section.movies} category={section.category} />
        ))}
      </section>
    </>
  );
}
