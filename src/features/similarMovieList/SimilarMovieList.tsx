import s from "./SimilarMovieList.module.css";
import { MovieCard } from "@/shared/components";
import { useGetMoviesSimilarQuery } from "@/shared/api/sharedApi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type Props = {
  movieId: number;
};

export const SimilarMovieList = ({ movieId }: Props) => {
  const { data: similar, isLoading } = useGetMoviesSimilarQuery(movieId);

  return (
    <section className={s.similar}>
      <h3>Similar Movies</h3>
      <div className={s["similar-grid"]}>
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <div key={`skeleton-${index}`}>
              <Skeleton height={225} style={{ marginBottom: "1rem" }} />
              <Skeleton width={100} height={20} />
            </div>
          ))
        ) : similar?.results && similar?.results.length > 0 ? (
          similar.results.slice(0, 6).map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p>No similar movies</p>
        )}
      </div>
    </section>
  );
};
