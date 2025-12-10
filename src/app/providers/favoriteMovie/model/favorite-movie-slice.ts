import { createSlice } from "@reduxjs/toolkit";

export const favoriteMovieSlice = createSlice({
  name: "favoriteMovie",
  initialState: {
    favoriteMovie: [] as FavoriteMovie[],
  },
  selectors: {
    selectFavorite: (state) => state.favoriteMovie,
  },
  reducers: (create) => ({
    addToFavoriteAC: create.reducer<{}>((state, action) => {

    }),
    deleteFromFavoriteAC: create.reducer<FavoriteMovie>(() => {
    }),
  }),
});

export const { selectFavorite } = favoriteMovieSlice.selectors;
export const { addToFavoriteAC, deleteFromFavoriteAC } = favoriteMovieSlice.actions;
export const favoriteMovieReducer = favoriteMovieSlice.reducer;

export type FavoriteMovie = {
  id: number;
  title: string;
  posterUrl: string,
  voteAverage: number;
};
