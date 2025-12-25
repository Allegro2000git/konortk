import { baseApi } from "@/app/api/baseApi";
import { moviesResponseSchema } from "@/shared/schemas";
import { errorToast } from "@/shared/utils";
import type { MoviesCategoryParams } from "@/shared/types";

export const movieApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategoryMovies: builder.query({
      query: ({ category, params }: { category: Category; params: MoviesCategoryParams }) => ({
        url: `movie/${category}`,
        params,
      }),
      responseSchema: moviesResponseSchema,
      catchSchemaFailure: (err) => {
        errorToast("Zod error. Details in the console", err.issues);
        return { status: "CUSTOM_ERROR", error: "Schema validation failed" };
      },
      providesTags: (_result, _error, { category }) => [{ type: "Movies", id: `${category}` }],
    }),
  }),
});

export const { useGetCategoryMoviesQuery } = movieApi;

export type Category = "popular" | "top_rated" | "upcoming" | "now_playing";
