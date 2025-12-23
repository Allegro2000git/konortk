import s from "./Favorites.module.css";
import { MovieCard } from "@/shared/components";
import { useFavorites } from "@/shared/hooks";

export function Favorites() {
  const favoriteMovies = useFavorites();

  return (
    <>
      <h2>Favorites</h2>
      <div className={s.movie}>
        <div className={s["favorite-movie-wrapper"]}>
          {favoriteMovies.length > 0 ? (
            favoriteMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
          ) : (
            <p>Add movies to favorites to see them on this page.</p>
          )}
        </div>
      </div>
    </>
  );
}
