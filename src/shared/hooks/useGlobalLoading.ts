import { useSelector } from "react-redux";
import type { RootState } from "@/app/providers/store";

export const useQueryGlobalLoading = () => {
  return useSelector((state: RootState) => {
    const queries = Object.values(state.baseApi.queries || {});

    return queries.some((query) => {
      if (query?.status !== "pending") {
        return;
      }
      const completed = queries.filter((q) => q?.status === "fulfilled");
      return completed.length > 0;
    });
  });
};
