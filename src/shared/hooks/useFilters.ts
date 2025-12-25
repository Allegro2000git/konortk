import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router";
import type { DiscoverMoviesParams, SortOption } from "@/shared/types";

const DEFAULT_FILTERS: DiscoverMoviesParams = {
  page: 1,
  sort_by: "popularity.desc",
  "vote_average.gte": 0,
  "vote_average.lte": 10,
  with_genres: undefined,
};

export const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(() => {
    return {
      page: Number(searchParams.get("page")) || DEFAULT_FILTERS.page,
      sort_by: (searchParams.get("sort_by") as SortOption) || DEFAULT_FILTERS.sort_by,
      "vote_average.gte": Number(searchParams.get("vote_average.gte")) || DEFAULT_FILTERS["vote_average.gte"],
      "vote_average.lte": Number(searchParams.get("vote_average.lte")) || DEFAULT_FILTERS["vote_average.lte"],
      with_genres: searchParams.get("with_genres") || undefined,
    };
  }, [searchParams]);

  const updateFilters = useCallback(
    (updates: Partial<DiscoverMoviesParams>) => {
      const newParams = new URLSearchParams(searchParams);

      for (const [key, value] of Object.entries(updates)) {
        if (value === undefined) {
          newParams.delete(key);
        } else {
          newParams.set(key, String(value));
        }
      }

      const changedNonePageParams = Object.keys(updates).some((k) => k !== "page");
      if (changedNonePageParams) {
        newParams.set("page", "1");
      }

      setSearchParams(newParams);
    },
    [searchParams, setSearchParams]
  );

  const resetFilters = useCallback(() => {
    setSearchParams(new URLSearchParams());
  }, []);

  return {
    filters,
    updateFilters,
    resetFilters,
  };
};
