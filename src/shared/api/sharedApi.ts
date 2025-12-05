import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/app/api/baseQuery";
import type { MoviesResponse } from "@/features/main/api/movieApi.types";
import type { GetMovieDetails, GetSearchMovies } from "@/shared/api/sharedApi.types";

export const sharedApi = createApi({
  reducerPath: "sharedApi",
  baseQuery,
  tagTypes: ["shared"],
  endpoints: (builder) => ({
    getSearchMovies: builder.query<MoviesResponse, GetSearchMovies>({
      query: (params) => ({
        url: "search/movie",
        params: {
          query: params.query,
          page: params.page,
        },
      }),
    }),
    getMovieDetails: builder.query<GetMovieDetails, number>({
      query: (movieId: number) => ({
        url: `movie/${movieId}`,
      }),
    }),
  }),
});

export const { useGetSearchMoviesQuery, useGetMovieDetailsQuery } = sharedApi;
