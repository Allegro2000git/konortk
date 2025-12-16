import type { GetMoviesCategory, MoviesResponse } from "@/features/main/api/movieApi.types";
import { baseApi } from "@/app/api/baseApi";

export const movieApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPopularMovies: builder.query<MoviesResponse, GetMoviesCategory>({
      query: (params) => ({
        url: "movie/popular",
        params,
      }),
      providesTags: (result, error, arg) => [{ type: "Popular", id: `${arg.page}` }],
    }),
    getTopRatedMovies: builder.query<MoviesResponse, GetMoviesCategory>({
      query: (params) => ({
        url: "movie/top_rated",
        params,
      }),
      providesTags: ["Movies", "Rated"],
    }),
    getUpcomingMovies: builder.query<MoviesResponse, GetMoviesCategory>({
      query: (params) => ({
        url: "movie/upcoming",
        params,
      }),
      providesTags: (result, error, arg) => [{ type: "Upcoming", id: `${arg.page}` }],
    }),
    getNowPlayingMovies: builder.query<MoviesResponse, GetMoviesCategory>({
      query: (params) => ({
        url: "movie/now_playing",
        params,
      }),
      providesTags: ["Movies", "Now"],
    }),
  }),
});

export const {
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetUpcomingMoviesQuery,
  useGetNowPlayingMoviesQuery,
} = movieApi;
