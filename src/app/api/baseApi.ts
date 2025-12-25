import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { handleErrors } from "@/shared/utils";

export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: ["Movies", "Shared", "Search", "Filters", "Genres"],
  endpoints: () => ({}),
  baseQuery: async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: import.meta.env.VITE_BASE_URL,
      prepareHeaders: (headers) => {
        headers.set("Content-Type", "application/json");
        const accessToken = import.meta.env.VITE_ACCESS_KEY;
        if (accessToken) {
          headers.set("Authorization", `Bearer ${accessToken}`);
        }
        return headers;
      },
    })(args, api, extraOptions);

    if (result.error) {
      handleErrors(result.error);
    }

    return result;
  },
});
