import { type Category, useGetCategoryMoviesQuery } from "@/features/main/api/movieApi";
import type { MoviesCategoryParams } from "@/shared/types";

export const useCategoryMovies = (category: Category, params: MoviesCategoryParams) => {
  return useGetCategoryMoviesQuery({ category, params });
};
