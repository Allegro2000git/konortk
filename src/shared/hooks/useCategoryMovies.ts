import {
  useGetNowPlayingMoviesQuery,
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetUpcomingMoviesQuery,
} from "@/features/main/api/movieApi";
import type { GetMoviesCategory } from "@/features/main/api/movieApi.types";

export const useCategoryMovies = (urlCategory: string, params?: GetMoviesCategory) => {
  const queryConfig = params || {};

  const getCurrectApiCategory = urlCategory.replace("-", "_");

  const categoryMap = {
    popular: useGetPopularMoviesQuery(queryConfig),
    top_rated: useGetTopRatedMoviesQuery(queryConfig),
    upcoming: useGetUpcomingMoviesQuery(queryConfig),
    now_playing: useGetNowPlayingMoviesQuery(queryConfig),
  } as const;

  return categoryMap[getCurrectApiCategory as keyof typeof categoryMap] || categoryMap.popular;
};
