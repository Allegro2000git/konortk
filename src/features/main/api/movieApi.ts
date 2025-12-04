import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/app/api/baseQuery";
import type { GetPopularMoviesParams, MoviesResponse } from "@/features/main/api/movieApi.types";

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery,
  tagTypes: ["Movies"],
  endpoints: (builder) => ({
    getPopularMovies: builder.query<MoviesResponse, GetPopularMoviesParams>({
      query: (params) => ({
        url: "movie/popular",
        params,
      }),
    }),
    getTopRatedMovies: builder.query<MoviesResponse, GetPopularMoviesParams>({
      query: (params) => ({
        url: "movie/top_rated",
        params,
      }),
    }),
    getUpcomingMovies: builder.query<MoviesResponse, GetPopularMoviesParams>({
      query: (params) => ({
        url: "movie/upcoming",
        params,
      }),
    }),
    getNowPlayingMovies: builder.query<MoviesResponse, GetPopularMoviesParams>({
      query: (params) => ({
        url: "movie/now_playing",
        params,
      }),
    }),
  }),
});

export const {
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetUpcomingMoviesQuery,
  useGetNowPlayingMoviesQuery,
} = movieApi;
