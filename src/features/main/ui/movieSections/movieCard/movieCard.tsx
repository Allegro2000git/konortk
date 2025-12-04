import s from "./MovieCard.module.css";
import type { Movie } from "@/features/main/api/movieApi.types";

type Props = {
  movie: Movie;
};

export const MovieCard = ({ movie }: Props) => {
  return (
    <div className={s.card}>
      <img src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`} alt={movie.title} className={s.poster} />
      <div>
        <h3 className={s.title}>{movie.title}</h3>
        <div className={s.rating}>{movie.vote_average.toFixed(1)}</div>
      </div>
    </div>
  );
};
