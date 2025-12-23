import { useSelector } from "react-redux";
import type { RootState } from "@/app/providers/store";
import { movieApi } from "@/features/main/api/movieApi";

const excludedEndpoints = [movieApi.endpoints.getCategoryMovies.name];

export const useQueryGlobalLoading = () => {
  return useSelector((state: RootState) => {
    const queries = Object.values(state.baseApi.queries || {});

    return queries.some((query) => {
      if (query?.status !== "pending") {
        return;
      } else if (
        excludedEndpoints.includes(query.endpointName) ||
        query.endpointName !== movieApi.endpoints.getCategoryMovies.name
      ) {
        const completed = queries.filter((q) => q?.status === "fulfilled");
        return completed.length > 0;
      }
    });
  });
};
