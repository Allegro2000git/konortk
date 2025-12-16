import type { MoviesResponse } from "@/features/main/api/movieApi.types";
import type { GetMovieDetails, GetSearchMovies, MovieCredits } from "@/shared/api/sharedApi.types";
import { baseApi } from "@/app/api/baseApi";

export const sharedApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSearchMovies: builder.infiniteQuery<MoviesResponse, GetSearchMovies, number>({
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
      providesTags: ["Shared", "Search"],
    }),
    getMovieDetails: builder.query<GetMovieDetails, number>({
      query: (movieId: number) => ({
        url: `movie/${movieId}`,
      }),
      providesTags: (_result, _error, id) => [{ type: "Shared", id }],
    }),
    getMovieCredits: builder.query<MovieCredits, number>({
      query: (movie_id) => ({
        url: `movie/${movie_id}/credits`,
      }),
      providesTags: (_result, _error, id) => [{ type: "Shared", id }],
    }),
    getMoviesSimilar: builder.query<MoviesResponse, number>({
      query: (movie_id) => ({
        url: `movie/${movie_id}/similar`,
      }),
      providesTags: (_result, _error, id) => [{ type: "Shared", id }],
    }),
  }),
});

export const {
  useGetSearchMoviesInfiniteQuery,
  useGetMovieDetailsQuery,
  useGetMovieCreditsQuery,
  useGetMoviesSimilarQuery,
} = sharedApi;
