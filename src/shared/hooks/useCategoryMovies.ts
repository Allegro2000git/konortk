import type { GetMoviesCategory } from "@/features/main/api/movieApi.types";
import {
  useGetNowPlayingMoviesQuery,
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetUpcomingMoviesQuery,
} from "@/features/main/api/movieApi";

export const useCategoryMovies = (urlCategory: string, params: GetMoviesCategory) => {
  const popularQuery = useGetPopularMoviesQuery(params, {
    skip: urlCategory !== "popular",
  });

  const topRatedQuery = useGetTopRatedMoviesQuery(params, {
    skip: urlCategory !== "top-rated",
  });

  const upcomingQuery = useGetUpcomingMoviesQuery(params, {
    skip: urlCategory !== "upcoming",
  });

  const nowPlayingQuery = useGetNowPlayingMoviesQuery(params, {
    skip: urlCategory !== "now-playing",
  });

  switch (urlCategory) {
    case "popular":
      return popularQuery;
    case "top-rated":
      return topRatedQuery;
    case "upcoming":
      return upcomingQuery;
    case "now-playing":
      return nowPlayingQuery;
    default:
      return popularQuery;
  }
};
