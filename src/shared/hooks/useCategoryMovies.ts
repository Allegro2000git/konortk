import type { GetMoviesCategory } from "@/shared/types";
import { type Category, useGetCategoryMoviesQuery } from "@/features/main/api/movieApi";

export const useCategoryMovies = (category: Category, params: GetMoviesCategory) => {
  return useGetCategoryMoviesQuery({ category, params });
};
