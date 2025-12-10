import { Link } from "react-router";
import s from "./MovieCard.module.css";
import type { Movie } from "@/features/main/api/movieApi.types";
import { getRatingClassName } from "@/shared/utils/getRatingClassName";
import ratingStyles from "@/shared/styles/RatingBadge/RatingBadge.module.css";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import {
  toggleFavoriteAC,
  type FavoriteMovie,
  selectFavorite,
} from "@/app/providers/favoriteMovie/model/favorite-movie-slice";
import * as React from "react";

type Props = {
  movie: Movie;
};

export const MovieCard = ({ movie }: Props) => {
  const favoriteMovie = useAppSelector(selectFavorite);
  const dispatch = useAppDispatch();
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w185${movie.poster_path}`
    : "https://placehold.co/280x420?text=No+Poster";

  const rating = Number(movie.vote_average.toFixed(1));

  const ratingClass = getRatingClassName(rating);

  const favoriteMovieExist = favoriteMovie.some((el) => el.id === movie.id);

  const handleToggleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();

    const selectFavoriteMovie: FavoriteMovie = {
      id: movie.id,
      title: movie.title,
      posterUrl: posterUrl,
      voteAverage: movie.vote_average,
    };
    dispatch(toggleFavoriteAC(selectFavoriteMovie));
  };

  return (
    <div className={s.card}>
      <Link to={`/movie/${movie.id}`}>
        <img src={posterUrl} alt={movie.title} className={s.poster} />
        <div>
          <h3 className={s.title}>{movie.title}</h3>
          <div className={`${ratingStyles.rating} ${ratingStyles[ratingClass]}`}>{rating}</div>
        </div>
      </Link>
      <button className={`${s.favorite} ${favoriteMovieExist ? s.active : ""}`} onClick={handleToggleFavoriteClick}>
        {favoriteMovieExist ? "❤️" : "🤍"}
      </button>
    </div>
  );
};
