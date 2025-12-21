import { store } from "@/app/providers/store";
import { movieApi } from "@/features/main/api/movieApi";

export const mainPageLoader = async () => {
  try {
    const popular = store.dispatch(
      movieApi.endpoints.getCategoryMovies.initiate({
        category: "popular",
        params: { page: 1 },
      })
    );

    const topRated = store.dispatch(
      movieApi.endpoints.getCategoryMovies.initiate({
        category: "top_rated",
        params: { page: 1 },
      })
    );

    const nowPlaying = store.dispatch(
      movieApi.endpoints.getCategoryMovies.initiate({
        category: "now_playing",
        params: { page: 1 },
      })
    );

    const upcoming = store.dispatch(
      movieApi.endpoints.getCategoryMovies.initiate({
        category: "upcoming",
        params: { page: 1 },
      })
    );

    await Promise.allSettled([popular, topRated, nowPlaying, upcoming]);

    return { preloaded: true };
  } catch (error) {
    console.error("Loader error:", error);
    return {
      preloaded: false,
      allRequestsSucceeded: false,
    };
  }
};
