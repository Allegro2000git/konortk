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
      <div className={s.movieSection}>
        <div className={s.cover} style={{ backgroundImage: movieBackdropPath ? `url(${movieBackdropPath})` : "" }}>
          <div>
            <h1 style={{ color: "white" }}>Main Content</h1>
            <SearchInput isSearchButtonActive={true} />
          </div>
        </div>
      </div>
    </>
  );
}
