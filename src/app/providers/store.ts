import { setupListeners } from "@reduxjs/toolkit/query";
import { configureStore } from "@reduxjs/toolkit";
import { themeReducer, themeSlice } from "@/app/providers/theme/model/theme-slice";
import { favoriteMovieReducer, favoriteMovieSlice } from "@/features/toggleFavoriteMovie/model/favorite-movie-slice";
import { baseApi } from "@/app/api/baseApi";

export const store = configureStore({
  reducer: {
    [themeSlice.name]: themeReducer,
    [favoriteMovieSlice.name]: favoriteMovieReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
