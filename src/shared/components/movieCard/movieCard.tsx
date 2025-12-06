import { Link } from "react-router";
import s from "./MovieCard.module.css";
import type { Movie } from "@/features/main/api/movieApi.types";
import { getRatingClassName } from "@/shared/utils/getRatingClassName";
import ratingStyles from "@/shared/styles/RatingBadge/RatingBadge.module.css";

type Props = {
  movie: Movie;
};

export const MovieCard = ({ movie }: Props) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w185${movie.poster_path}`
    : "https://placehold.co/280x420?text=No+Poster";

  const rating = Number(movie.vote_average.toFixed(1));

  const ratingClass = getRatingClassName(rating);

  return (
    <Link to={`/movie/${movie.id}`} className={s.card}>
      <img src={posterUrl} alt={movie.title} className={s.poster} />
      <div>
        <h3 className={s.title}>{movie.title}</h3>
        <div className={`${ratingStyles.rating} ${ratingStyles[ratingClass]}`}>{rating}</div>
      </div>
      <button className={s.favorite}>Lik</button>
    </Link>
  );
};
