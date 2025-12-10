import { useGetMovieCreditsQuery, useGetMovieDetailsQuery, useGetMoviesSimilarQuery } from "@/shared/api/sharedApi";
import { useNavigate, useParams } from "react-router";
import s from "./MovieDetails.module.css";
import { getRatingClassName } from "@/shared/utils/getRatingClassName";
import ratingStyles from "@/shared/styles/RatingBadge/RatingBadge.module.css";
import { MovieCard } from "@/shared/components/movieCard";
import { Path } from "@/app/providers/routes/Routing";

export const MovieDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const movieId = id ? parseInt(id, 10) : 0;

  const { data, isError, isLoading } = useGetMovieDetailsQuery(movieId, {
    skip: !movieId,
  });

  const { data: creditsData } = useGetMovieCreditsQuery(movieId);
  const { data: similar } = useGetMoviesSimilarQuery(movieId);

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

  const mainCast = creditsData?.cast.filter((actor) => actor.known_for_department === "Acting").slice(0, 6) || [];

  const onClickBackHandler = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(Path.Main);
    }
  };

  return (
    <section>
      <div className={s.info}>
        <img src={posterUrl} alt={"movie poster"} className={s["poster-info"]} />
        <div>
          <div className={s.top}>
            <h2 className={s.title}>{data.title}</h2>
            <button className={s.button} onClick={onClickBackHandler}>
              back
            </button>
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
      <section>
        <h3>Cast:</h3>
        <div className={s["cast-grid"]}>
          {mainCast.map((actor) => {
            const actorPhotoUrl = actor.profile_path
              ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
              : "https://placehold.co/150x225?text=No+Photo";

            return (
              <div key={actor.id} className={s["actor-card"]}>
                <img src={actorPhotoUrl} alt={actor.name} className={s["actor-photo"]} />
                <div>
                  <p>{actor.name}</p>
                  <p className={s["actor-character"]}>{actor.character}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      {similar?.results && similar.results.length > 0 && (
        <section className={s.similar}>
          <h3>Similar Movies</h3>
          <div className={s["similar-grid"]}>
            {similar.results.slice(0, 6).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      )}
    </section>
  );
};
