import { SearchInput } from "@/shared/components/searchInput/SearchInput";
import { MovieSection } from "@/features/main/ui/movieSections/MovieSection";
import s from "./Main.module.css";
import {
  useGetNowPlayingMoviesQuery,
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetUpcomingMoviesQuery,
} from "@/features/main/api/movieApi";
import { getMovieBackdropPath } from "@/features/movieBackdropPath/getMovieBackdropPath";

export function Main() {
  const { data: popularData, isLoading, isError } = useGetPopularMoviesQuery({});
  const { data: topRatedData } = useGetTopRatedMoviesQuery({});
  const { data: nowPlayingData } = useGetNowPlayingMoviesQuery({});
  const { data: upcomingData } = useGetUpcomingMoviesQuery({});
  const movieBackdropPath = getMovieBackdropPath();

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
        <div className={s.container}>
          <h1>Welcome</h1>
          <h3 className={s.subtitle}>Browse highlighted titles from TMDB</h3>
          <SearchInput isSearchButtonActive={true} />
        </div>
      </div>
      <section className={s.container}>
        {sections.map((section, index) => (
          <MovieSection key={index} title={section.title} movies={section.movies} category={section.category} />
        ))}
      </section>
    </>
  );
}
