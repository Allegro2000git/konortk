import type { GetMoviesCategory, MoviesResponse } from "@/features/main/api/movieApi.types";
import { baseApi } from "@/app/api/baseApi";

export const movieApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPopularMovies: builder.query<MoviesResponse, GetMoviesCategory>({
      query: (params) => ({
        url: "movie/popular",
        params,
      }),
      providesTags: ["Movies"],
    }),
    getTopRatedMovies: builder.query<MoviesResponse, GetMoviesCategory>({
      query: (params) => ({
        url: "movie/top_rated",
        params,
      }),
    }),
    getUpcomingMovies: builder.query<MoviesResponse, GetMoviesCategory>({
      query: (params) => ({
        url: "movie/upcoming",
        params,
      }),
      providesTags: ["Movies"],
    }),
    getNowPlayingMovies: builder.query<MoviesResponse, GetMoviesCategory>({
      query: (params) => ({
        url: "movie/now_playing",
        params,
      }),
      providesTags: ["Movies"],
    }),
  }),
});

export const {
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetUpcomingMoviesQuery,
  useGetNowPlayingMoviesQuery,
} = movieApi;
