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
    : "/path/to/default-poster.jpg"; // Замените на путь к своей заглушке

  const rating = Number(movie.vote_average.toFixed(1));

  const ratingClass = getRatingClassName(rating);

  return (
    <>
      <Link to={`/movie/${movie.id}`} className={s.card}>
        <img src={posterUrl} alt={movie.title} className={s.poster} />
        <div>
          <h3 className={s.title}>{movie.title}</h3>
          <div className={`${ratingStyles.rating} ${ratingStyles[ratingClass]}`}>{rating}</div>
        </div>
        <button className={s.favorite}></button>
      </Link>
    </>
  );
};

/*

{/!*<button className={s.favoriteBtn}>
        <svg className={s.heartIcon} width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </button>*!/}*/
