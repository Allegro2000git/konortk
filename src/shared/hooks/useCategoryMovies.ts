import type { GetMoviesCategory } from "@/features/main/api/movieApi.types";
import { movieApi } from "@/features/main/api/movieApi";

const categoryMap = {
  popular: movieApi.endpoints.getPopularMovies,
  "top-rated": movieApi.endpoints.getTopRatedMovies,
  upcoming: movieApi.endpoints.getUpcomingMovies,
  "now-playing": movieApi.endpoints.getNowPlayingMovies,
} as const;

export const useCategoryMovies = (urlCategory: string, params: GetMoviesCategory) => {
  const endpoint = categoryMap[urlCategory as keyof typeof categoryMap] || categoryMap.popular;
  return endpoint.useQuery(params);
};
