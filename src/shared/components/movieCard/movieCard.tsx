import { Link } from "react-router";
import s from "./MovieCard.module.css";
import type { Movie } from "@/features/main/api/movieApi.types";
import ratingStyles from "@/shared/styles/RatingBadge/RatingBadge.module.css";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import {
  toggleFavoriteAC,
  type FavoriteMovie,
  selectFavorite,
} from "@/features/toggleFavoriteMovie/model/favorite-movie-slice";
import * as React from "react";
import { getRatingClassName } from "@/shared/utils";

type MovieCardData = Movie | FavoriteMovie;

const isFavoriteMovie = (movie: MovieCardData): movie is FavoriteMovie => {
  return "posterUrl" in movie && "voteAverage" in movie;
};

type Props = {
  movie: MovieCardData;
};

export const MovieCard = ({ movie }: Props) => {
  const favoriteMovie = useAppSelector(selectFavorite);
  const dispatch = useAppDispatch();

  let posterUrl: string;
  let rating: number | undefined;

  if (isFavoriteMovie(movie)) {
    posterUrl = movie.posterUrl;
    rating = movie.voteAverage;
  } else {
    posterUrl = movie.poster_path
      ? `https://image.tmdb.org/t/p/w185${movie.poster_path}`
      : "https://placehold.co/280x420?text=No+Poster";
    rating = movie.vote_average;
  }

  const finalRating = rating !== undefined ? Number(rating.toFixed(1)) : 0;
  const ratingClass = getRatingClassName(finalRating);

  const favoriteMovieExist = favoriteMovie.some((el) => el.id === movie.id);

  const handleToggleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();

    const selectFavoriteMovie: FavoriteMovie = {
      id: movie.id,
      title: movie.title,
      posterUrl: posterUrl,
      voteAverage: rating,
    };
    dispatch(toggleFavoriteAC(selectFavoriteMovie));
  };

  return (
    <div className={s.card}>
      <Link to={`/movie/${movie.id}`}>
        <img src={posterUrl} alt={movie.title} className={s.poster} />
        <div>
          <h3 className={s.title}>{movie.title}</h3>
          <div className={`${ratingStyles.rating} ${ratingStyles[ratingClass]}`}>{finalRating}</div>
        </div>
      </Link>
      <button className={`${s.favorite} ${favoriteMovieExist ? s.active : ""}`} onClick={handleToggleFavoriteClick} />
    </div>
  );
};
