import { setupListeners } from "@reduxjs/toolkit/query";
import { configureStore } from "@reduxjs/toolkit";
import { movieApi } from "@/features/main/api/movieApi";
import { sharedApi } from "@/shared/api/sharedApi";
import { themeReducer, themeSlice } from "@/app/providers/theme/model/theme-slice";
import { favoriteMovieReducer, favoriteMovieSlice } from "@/app/providers/favoriteMovie/model/favorite-movie-slice";

export const store = configureStore({
  reducer: {
    [movieApi.reducerPath]: movieApi.reducer,
    [sharedApi.reducerPath]: sharedApi.reducer,
    [themeSlice.name]: themeReducer,
    [favoriteMovieSlice.name]: favoriteMovieReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(movieApi.middleware, sharedApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
