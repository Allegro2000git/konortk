import type { GetMoviesCategory, MoviesResponse } from "@/features/main/api/movieApi.types";
import { baseApi } from "@/app/api/baseApi";

export const movieApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategoryMovies: builder.query<MoviesResponse, { category: Category; params: GetMoviesCategory }>({
      query: ({ category, params }) => ({
        url: `movie/${category}`,
        params,
      }),
      providesTags: (_result, _error, { category }) => [{ type: "Movies", id: `${category}` }],
    }),
  }),
});

export const { useGetCategoryMoviesQuery } = movieApi;

export type Category = "popular" | "top_rated" | "upcoming" | "now_playing";
