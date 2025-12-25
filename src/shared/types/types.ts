import {
  GenresResponseSchema,
  GetMovieDetailsSchema,
  MovieCreditsSchema,
  movieSchema,
  moviesResponseSchema,
} from "@/shared/schemas";
import { z } from "zod/v4";

export type Movie = z.infer<typeof movieSchema>;
export type MoviesResponse = z.infer<typeof moviesResponseSchema>;
export type GetMovieDetails = z.infer<typeof GetMovieDetailsSchema>;
export type MovieCredits = z.infer<typeof MovieCreditsSchema>;
export type GenresResponse = z.infer<typeof GenresResponseSchema>;

export type MoviesCategoryParams = {
  language?: string;
  page?: number;
  region?: string;
};

export type SearchMoviesParams = MoviesCategoryParams & {
  query: string;
  include_adult?: boolean;
  primary_release_year?: string;
  year?: string;
};

export type SortOption =
  | "popularity.desc"
  | "popularity.asc"
  | "vote_average.desc"
  | "vote_average.asc"
  | "primary_release_date.desc"
  | "primary_release_date.asc"
  | "original_title.asc"
  | "original_title.desc";

export type DiscoverMoviesParams = {
  sort_by?: SortOption;
  "vote_average.gte"?: number;
  "vote_average.lte"?: number;
  with_genres?: string | undefined;
  page?: number;
};
