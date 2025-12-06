/*
создайте компонент для кнопки "Добавить в избранное":
tsx
// FavoriteButton.tsx
import { useState } from "react";
import s from "./FavoriteButton.module.css";

type Props = {
  movieId: number;
};

export const FavoriteButton = ({ movieId }: Props) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation(); // Предотвращаем переход по ссылке
    e.preventDefault();
    setIsFavorite(!isFavorite);
    // Здесь можно добавить логику сохранения в localStorage или Redux
  };

  return (
    <button
      className={`${s.favoriteButton} ${isFavorite ? s.active : ''}`}
      onClick={handleToggleFavorite}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      {isFavorite ? '★' : '☆'}
    </button>
  );
};
Добавьте этот компонент в MovieCard для функциональности добавления в избранное при наведении.
*/
