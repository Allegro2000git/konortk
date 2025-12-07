import { useGetMovieDetailsQuery } from "@/shared/api/sharedApi";
import { Link, useParams } from "react-router";
import s from "./MovieDetails.module.css";
import { getRatingClassName } from "@/shared/utils/getRatingClassName";
import ratingStyles from "@/shared/styles/RatingBadge/RatingBadge.module.css";

export const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const movieId = id ? parseInt(id, 10) : 0;

  const { data, isError, isLoading } = useGetMovieDetailsQuery(movieId, {
    skip: !movieId,
  });

  if (isError) {
    return <div>Some occurred error</div>;
  }

  if (isLoading) {
    return <div>Loading movie details...</div>;
  }

  if (!data) {
    return <div>Movie not found</div>;
  }

  const rating = Number(data.vote_average.toFixed(1));
  const ratingClass = getRatingClassName(rating);

  const posterUrl = data.poster_path
    ? `https://image.tmdb.org/t/p/w342${data.poster_path}`
    : "https://placehold.co/280x420?text=No+Poster";

  return (
    <section>
      <div className={s.info}>
        <img src={posterUrl} alt={"movie poster"} className={s["poster-info"]} />
        <div>
          <div className={s.top}>
            <h2 className={s.title}>{data.title}</h2>
            <Link to={""} className={s.link}>
              back
            </Link>
          </div>
          <div className={s.meta}>
            <h5 className={s.release}>Release year: {new Date(data.release_date).getFullYear()}</h5>
            <span className={`${s.rating} ${ratingStyles[ratingClass]}`}>{rating}</span>
            <span>Runtime: {data.runtime}m</span>
          </div>
          <p className={s.text}>{data.overview}</p>
          <div>Genres: {data.genres?.map((g) => g.name).join(", ")}</div>
        </div>
      </div>
      <section>Cast</section>
      <section>Similar Movies</section>
    </section>
  );
};
