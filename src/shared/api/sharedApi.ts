import { baseApi } from "@/app/api/baseApi";
import type {
  DiscoverMoviesParams,
  GenresResponse,
  GetMovieDetails,
  MovieCredits,
  MoviesResponse,
  SearchMoviesParams,
} from "@/shared/types";
import {
  GenresResponseSchema,
  GetMovieDetailsSchema,
  MovieCreditsSchema,
  moviesResponseSchema,
} from "@/shared/schemas";
import { errorToast } from "@/shared/utils";

export const sharedApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSearchMovies: builder.infiniteQuery<MoviesResponse, SearchMoviesParams, number>({
      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
          if (lastPage.page < lastPage.total_pages) {
            return lastPage.page + 1;
          }
        },
      },
      query: ({ queryArg, pageParam = 1 }) => ({
        url: "search/movie",
        params: {
          query: queryArg.query,
          page: pageParam,
        },
      }),
      providesTags: ["Search"],
    }),
    getMovieDetails: builder.query<GetMovieDetails, number>({
      query: (movieId: number) => ({
        url: `movie/${movieId}`,
      }),
      responseSchema: GetMovieDetailsSchema,
      catchSchemaFailure: (err) => {
        errorToast("Zod error. Details in the console", err.issues);
        return { status: "CUSTOM_ERROR", error: "Schema validation failed" };
      },
      providesTags: (_result, _error, id) => [{ type: "Shared", id }],
    }),
    getMovieCredits: builder.query<MovieCredits, number>({
      query: (movie_id) => ({
        url: `movie/${movie_id}/credits`,
      }),
      responseSchema: MovieCreditsSchema,
      catchSchemaFailure: (err) => {
        errorToast("Zod error. Details in the console", err.issues);
        return { status: "CUSTOM_ERROR", error: "Schema validation failed" };
      },
      providesTags: (_result, _error, id) => [{ type: "Shared", id }],
    }),
    getMoviesSimilar: builder.query<MoviesResponse, number>({
      query: (movie_id) => ({
        url: `movie/${movie_id}/similar`,
      }),
      responseSchema: moviesResponseSchema,
      catchSchemaFailure: (err) => {
        errorToast("Zod error. Details in the console", err.issues);
        return { status: "CUSTOM_ERROR", error: "Schema validation failed" };
      },
      providesTags: (_result, _error, id) => [{ type: "Shared", id }],
    }),
    getSortedMovies: builder.query<MoviesResponse, DiscoverMoviesParams>({
      query: (params) => ({
        url: "discover/movie",
        params,
      }),
      responseSchema: moviesResponseSchema,
      catchSchemaFailure: (err) => {
        errorToast("Zod error. Details in the console", err.issues);
        return { status: "CUSTOM_ERROR", error: "Schema validation failed" };
      },
      providesTags: ["Filters"],
    }),
    getMovieList: builder.query<GenresResponse, void>({
      query: () => ({
        url: "genre/movie/list",
      }),
      responseSchema: GenresResponseSchema,
      catchSchemaFailure: (err) => {
        errorToast("Zod error. Details in the console", err.issues);
        return { status: "CUSTOM_ERROR", error: "Schema validation failed" };
      },
      providesTags: ["Genres"],
    }),
  }),
});

export const {
  useGetSearchMoviesInfiniteQuery,
  useGetMovieDetailsQuery,
  useGetMovieCreditsQuery,
  useGetMoviesSimilarQuery,
  useGetSortedMoviesQuery,
  useGetMovieListQuery,
} = sharedApi;
