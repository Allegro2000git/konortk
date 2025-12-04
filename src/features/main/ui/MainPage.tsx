import { useGetPopularMoviesCoverQuery } from "@/features/main/api/movieApi";
import s from "./MainPage.module.css";
import { SearchInput } from "@/shared/ui/SearchInput";

export function MainPage() {
  const {
    data: popularData,
    isLoading: isPopularLoading,
    isError: isPopularError,
  } = useGetPopularMoviesCoverQuery({ language: "en-US", page: 1 });

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
            <h1 style={{ color: "white", textTransform: "uppercase" }}>Welcome</h1>
            <h3 style={{ color: "white", fontWeight: "normal", padding: "30px 0" }}>
              Browse highlighted titles from TMDB
            </h3>
            <SearchInput isSearchButtonActive={true} />
          </div>
        </div>
        <section className={s.container}>
          <h2 style={{ color: "red" }}>Hello</h2>
        </section>
      </div>
    </>
  );
}
