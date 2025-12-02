import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/app/api/baseQuery";
import type { GetPopularMoviesParams, MoviesResponse } from "@/features/main/api/movieApi.types";

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery,
  tagTypes: ["Movies"],
  endpoints: (builder) => ({
    getPopularMoviesCover: builder.query<MoviesResponse, GetPopularMoviesParams>({
      query: (params) => ({
        url: "movie/popular",
        params: {
          language: params.language,
          page: params.page,
        },
      }),
    }),
  }),
});

export const { useGetPopularMoviesCoverQuery } = movieApi;
