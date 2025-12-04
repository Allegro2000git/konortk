import s from "./MovieSection.module.css";
import type { Movie } from "@/features/main/api/movieApi.types";
import { MovieCard } from "@/features/main/ui/movieSections/movieCard/movieCard";
import { Link } from "react-router";

interface Props {
  title: string;
  movies: Movie[];
  linkTo: string;
}

export const MovieSection = ({ title, movies, linkTo }: Props) => {
  return (
    <>
      <div className={s.header}>
        <h2 className={s.title}>{title}</h2>
        <button className={s.link}>
          <Link to={linkTo}>View more</Link>
        </button>
      </div>

      <div className={s["movies-grid"]}>
        {movies.slice(0, 6).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
};
