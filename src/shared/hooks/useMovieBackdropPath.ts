import type { MoviesResponse } from "@/shared/types";

export const useMovieBackdropPath = (data?: MoviesResponse) => {
  if (!data?.results || data.results.length === 0) {
    return;
  }
  const moviesWithBackdrop = data.results.filter((movie) => movie.backdrop_path);
  const randomMovie = moviesWithBackdrop[Math.floor(Math.random() * moviesWithBackdrop.length)];
  return `https://image.tmdb.org/t/p/original${randomMovie.backdrop_path}`;
};
