import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router";
import type { DiscoverMoviesParams } from "@/shared/api/sharedApi.types";

export const useUrlFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo((): DiscoverMoviesParams => {
    const genres =
      searchParams
        .get("genres")
        ?.split(",")
        .map((el) => Number(el)) || [];
    return {
      with_genres: genres.length > 0 ? genres.join(",") : undefined,
      "vote_average.gte": Number(searchParams.get("vote_average.gte")) || 0,
      "vote_average.lte": Number(searchParams.get("vote_average.lte")) || 10,
      sort_by: searchParams.get("sort_by") || "popularity.desc",
      page: Number(searchParams.get("page")) || 1,
    };
  }, [searchParams]);

  const updateFilters = useCallback(
    (updates: Partial<DiscoverMoviesParams>) => {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);

        Object.entries(updates).forEach(([key, value]) => {
          if (key === "genres") {
            if (value && Array.isArray(value) && value.length > 0) {
              newParams.set("genres", value.join(","));
            } else {
              newParams.delete("genres");
            }
          } else if (key === "rating_min" || key === "rating_max") {
            if (value !== undefined) {
              newParams.set(key, value.toString());
            }
          } else if (key === "sort_by") {
            if (value) {
              newParams.set(key, value);
            }
          } else if (key === "page") {
            // При изменении фильтров сбрасываем на первую страницу
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
      newParams.delete("genres");
      newParams.delete("rating_min");
      newParams.delete("rating_max");
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
