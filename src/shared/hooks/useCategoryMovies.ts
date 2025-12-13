import type { GetMoviesCategory } from "@/features/main/api/movieApi.types";
import { movieApi } from "@/features/main/api/movieApi";

const categoryMap = {
  popular: movieApi.endpoints.getPopularMovies,
  top_rated: movieApi.endpoints.getTopRatedMovies,
  upcoming: movieApi.endpoints.getUpcomingMovies,
  now_playing: movieApi.endpoints.getNowPlayingMovies,
} as const;

export const useCategoryMovies = (urlCategory: string, params: GetMoviesCategory) => {
  const category = urlCategory.replace("-", "_");
  const endpoint = categoryMap[category as keyof typeof categoryMap] || categoryMap.popular;
  return endpoint.useQuery(params);
};
