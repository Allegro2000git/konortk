import { useEffect, useState } from "react";
import { type FavoriteMovie, selectFavorite } from "@/features/toggleFavoriteMovie/model/favorite-movie-slice";
import { useAppSelector } from "@/shared/hooks/useAppSelector";

export function useFavorites() {
  const favoriteMovieStorage = useAppSelector(selectFavorite);
  const [favorites, setFavorites] = useState<FavoriteMovie[]>(favoriteMovieStorage);

  useEffect(() => {
    setFavorites(favoriteMovieStorage);
  }, [favoriteMovieStorage]);

  useEffect(() => {
    const loadFavorites = () => {
      const moviesFromStorage = localStorage.getItem("toggleFavoriteMovie");
      if (moviesFromStorage) {
        try {
          setFavorites(JSON.parse(moviesFromStorage));
        } catch (error) {
          console.error("Error parsing favorites:", error);
        }
      }
    };

    loadFavorites();
  }, []);

  return favorites;
}
