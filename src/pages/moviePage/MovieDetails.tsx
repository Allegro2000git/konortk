import { useGetMovieDetailsQuery } from "@/shared/api/sharedApi";
import { useNavigate, useParams } from "react-router";
import s from "./MovieDetails.module.css";
import ratingStyles from "@/shared/styles/RatingBadge/RatingBadge.module.css";
import { NavLinkButton } from "@/shared/components";
import { Path } from "@/app/providers/routes/Routing";
import { getRatingClassName } from "@/shared/utils";
import { MainCastList } from "@/features/mainCastList/MainCastList";
import { SimilarMovieList } from "@/features/similarMovieList/SimilarMovieList";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const MovieDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const movieId = id ? parseInt(id, 10) : 0;

  const { data, isLoading } = useGetMovieDetailsQuery(movieId, {
    skip: !movieId,
  });
  const rating = Number(data?.vote_average.toFixed(1));
  const ratingClass = getRatingClassName(rating);

  const posterUrl = data?.poster_path
    ? `https://image.tmdb.org/t/p/w342${data.poster_path}`
    : "https://placehold.co/280x420?text=No+Poster";

  const onClickBackHandler = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(Path.Main);
    }
  };

  return (
    <div>
      {isLoading ? (
        <div style={{ display: "flex", margin: "2rem 0", gap: "2rem" }}>
          <Skeleton height={400} width={250} />
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Skeleton width={350} height={75} />
            <Skeleton width={900} height={200} />
          </div>
        </div>
      ) : (
        <div className={s.info}>
          <img src={posterUrl} alt={"movie poster"} className={s["poster-info"]} />
          <div>
            <div className={s.top}>
              <p className={s.title}>{data?.title}</p>
              <NavLinkButton to={""} variant={"category"} onClick={onClickBackHandler}>
                back
              </NavLinkButton>
            </div>
            <div className={s.meta}>
              <h5 className={s.release}>Release year: {new Date(data?.release_date ?? "").getFullYear()}</h5>
              <span className={`${s.rating} ${ratingStyles[ratingClass]}`}>{rating}</span>
              <span>Runtime: {data?.runtime}m</span>
            </div>
            <p className={s.text}>{data?.overview}</p>
            <div>Genres: {data?.genres?.map((g) => g.name).join(", ")}</div>
          </div>
        </div>
      )}
      <MainCastList movieId={movieId} />
      <SimilarMovieList movieId={movieId} />
    </div>
  );
};
