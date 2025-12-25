import s from "./MovieSection.module.css";
import { Link } from "react-router";
import { MovieCard } from "@/shared/components";
import type { Movie } from "@/shared/types";

type Props = {
  title: string;
  movies: Movie[];
  category: string;
};

export const MovieSection = ({ title, movies, category }: Props) => {
  return (
    <>
      <div className={s.header}>
        <h2 className={s.title}>{title}</h2>
        <Link className={s.link} to={`/movies/${category}`}>
          View more
        </Link>
      </div>

      <div className={s["movies-grid"]}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
};
