import {
  useGetNowPlayingMoviesQuery,
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetUpcomingMoviesQuery,
} from "@/features/main/api/movieApi";
import s from "./MainPage.module.css";
import { SearchInput } from "@/shared/ui/searchInput/SearchInput";
import { MovieSection } from "@/features/main/ui/movieSections/MovieSection";

export function MainPage() {
  const { data: popularData, isLoading: isPopularLoading, isError: isPopularError } = useGetPopularMoviesQuery({});
  const { data: topRatedData } = useGetTopRatedMoviesQuery({});
  const { data: nowPlayingData } = useGetNowPlayingMoviesQuery({});
  const { data: upcomingData } = useGetUpcomingMoviesQuery({});

  const sections = [
    {
      title: "Popular Movies",
      movies: popularData?.results || [],
    },
    {
      title: "Top Rated Movies",
      movies: topRatedData?.results || [],
    },
    {
      title: "Upcoming Movies",
      movies: upcomingData?.results || [],
    },
    {
      title: "Now Playing Movies",
      movies: nowPlayingData?.results || [],
    },
  ];

  if (isPopularError) {
    return <div>Some error occurred...</div>;
  }

  if (isPopularLoading) {
    return <div>Loading...</div>;
  }
  const getMovieBackdropPath = () => {
    if (!popularData?.results || popularData.results.length === 0) {
      return;
    }
    const moviesWithBackdrop = popularData.results.filter((movie) => movie.backdrop_path);
    const randomMovie = moviesWithBackdrop[Math.floor(Math.random() * moviesWithBackdrop.length)];
    return `https://image.tmdb.org/t/p/original${randomMovie.backdrop_path}`;
  };

  const movieBackdropPath = getMovieBackdropPath();

  return (
    <>
      <div>
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
            <MovieSection key={index} title={section.title} movies={section.movies} />
          ))}
        </section>
      </div>
    </>
  );
}
