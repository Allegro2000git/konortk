import s from "./MovieSection.module.css";
import type { Movie } from "@/features/main/api/movieApi.types";
import { Link } from "react-router";
import { Path } from "@/app/providers/routes/Routing";
import { MovieCard } from "@/shared/components/movieCard";

type Props = {
  title: string;
  movies: Movie[];
};

export const MovieSection = ({ title, movies }: Props) => {
  return (
    <>
      <div className={s.header}>
        <h2 className={s.title}>{title}</h2>
        <button className={s.link}>
          <Link to={Path.Movies}>View more</Link>
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
