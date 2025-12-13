import { createSlice } from "@reduxjs/toolkit";

const loadFavoritesFromLocalStorage = (): FavoriteMovie[] => {
  try {
    const favorites = localStorage.getItem("toggleFavoriteMovie");
    if (favorites) {
      return JSON.parse(favorites);
    }
  } catch (error) {
    console.error("Error loading favorites from localStorage:", error);
  }
  return [];
};

export const favoriteMovieSlice = createSlice({
  name: "favoriteMovie",
  initialState: loadFavoritesFromLocalStorage(),
  selectors: {
    selectFavorite: (state) => state,
  },
  reducers: (create) => ({
    toggleFavoriteAC: create.reducer<FavoriteMovie>((state, action) => {
      const selectedMovie = action.payload;
      const existedMovieId = state.findIndex((movie) => movie.id === selectedMovie.id);
      if (existedMovieId !== -1) {
        state.splice(existedMovieId, 1);
      } else {
        state.push(selectedMovie);
      }
      localStorage.setItem("toggleFavoriteMovie", JSON.stringify(state));
    }),
  }),
});

export const { selectFavorite } = favoriteMovieSlice.selectors;
export const { toggleFavoriteAC } = favoriteMovieSlice.actions;
export const favoriteMovieReducer = favoriteMovieSlice.reducer;

export type FavoriteMovie = {
  id: number;
  title: string;
  posterUrl: string;
  voteAverage: number;
};
