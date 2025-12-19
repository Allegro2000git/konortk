import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router";
import type { DiscoverMoviesParams, SortOption } from "@/shared/api/sharedApi.types";

export const useUrlFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo((): DiscoverMoviesParams => {
    const genres =
      searchParams
        .get("with_genres")
        ?.split(",")
        .map((el) => String(el)) || [];
    return {
      with_genres: ["with_genres"].length > 0 ? genres.join(",") : undefined,
      "vote_average.gte": Number(searchParams.get("vote_average.gte")) || 0,
      "vote_average.lte": Number(searchParams.get("vote_average.lte")) || 10,
      sort_by: (searchParams.get("sort_by") as SortOption) || "popularity.desc",
      page: Number(searchParams.get("page")) || 1,
    };
  }, [searchParams]);

  const updateFilters = useCallback(
    (updates: DiscoverMoviesParams) => {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);

        Object.entries(updates).forEach(([key, value]) => {
          if (key === "with_genres") {
            if (value && typeof value === "string" && value.length > 0) {
              newParams.set("with_genres", value);
            }
          } else if (key === "vote_average.gte" || key === "vote_average.lte") {
            if (value !== undefined) {
              newParams.set(key, value.toString());
            }
          } else if (key === "sort_by") {
            if (value) {
              newParams.set(key, value.toString());
            }
          } else if (key === "page") {
            newParams.set(key, value.toString());
          }
        });

        return newParams;
      });
    },
    [setSearchParams]
  );

  const resetFilters = useCallback(() => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.delete("with_genres");
      newParams.delete("vote_average.gte");
      newParams.delete("vote_average.lte");
      newParams.set("page", "1");
      return newParams;
    });
  }, [setSearchParams]);

  return {
    filters,
    updateFilters,
    resetFilters,
  };
};
