import type { GetMoviesCategory } from "@/features/main/api/movieApi.types";
import { type Category, useGetCategoryMoviesQuery } from "@/features/main/api/movieApi";

export const useCategoryMovies = (category: Category, params: GetMoviesCategory) => {
  return useGetCategoryMoviesQuery({ category, params });
};
