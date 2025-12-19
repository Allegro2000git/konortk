import { useCallback, useState } from "react";
import type { DiscoverMoviesParams } from "@/shared/api/sharedApi.types";

const DEFAULT_FILTERS: DiscoverMoviesParams = {
  page: 1,
  sort_by: "popularity.desc",
  "vote_average.gte": 0,
  "vote_average.lte": 10,
  with_genres: undefined,
};

export const useFilters = () => {
  const [filters, setFilters] = useState<DiscoverMoviesParams>(DEFAULT_FILTERS);

  const updateFilters = useCallback((updates: Partial<DiscoverMoviesParams>) => {
    setFilters((prev) => {
      const newFilters = { ...prev, ...updates };

      const hasNonPageUpdate = Object.keys(updates).some((key) => key !== "page");
      if (hasNonPageUpdate) {
        newFilters.page = 1;
      }

      return newFilters;
    });
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  return {
    filters,
    updateFilters,
    resetFilters,
  };
};
