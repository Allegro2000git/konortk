import { Link } from "react-router";
import s from "./MovieCard.module.css";
import type { Movie } from "@/features/main/api/movieApi.types";

type Props = {
  movie: Movie;
};

export const MovieCard = ({ movie }: Props) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w185${movie.poster_path}`
    : "/path/to/default-poster.jpg"; // Замените на путь к своей заглушке

  return (
    <Link to={`/movie/${movie.id}`} className={s.card}>
      <img src={posterUrl} alt={movie.title} className={s.poster} />
      {/*ниже добпвить кнопку при навдении в добавление в любимые */}
      <div>
        <h3 className={s.title}>{movie.title}</h3>
        <div className={s.rating}>{movie.vote_average.toFixed(1)}</div>
      </div>
    </Link>
  );
};
