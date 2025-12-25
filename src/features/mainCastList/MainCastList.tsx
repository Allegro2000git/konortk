import { useGetMovieCreditsQuery } from "@/shared/api/sharedApi";
import s from "./MainCastList.module.css";
import Skeleton from "react-loading-skeleton";

type Props = {
  movieId: number;
};

export const MainCastList = ({ movieId }: Props) => {
  const { data: creditsData, isLoading } = useGetMovieCreditsQuery(movieId);

  const mainCast = creditsData?.cast.filter((actor) => actor.known_for_department === "Acting").slice(0, 6) || [];

  const getActorPhotoUrl = (path: string | null) => {
    return path ? `https://image.tmdb.org/t/p/w185${path}` : "https://placehold.co/150x225?text=No+Photo";
  };

  return (
    <section>
      <h3>Cast:</h3>
      <div className={s["cast-grid"]}>
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <div key={`skeleton-${index}`} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Skeleton height={150} width={150} style={{ borderRadius: "50%", margin: "1rem 0" }} />
              <Skeleton width={100} height={20} />
            </div>
          ))
        ) : mainCast.length > 0 ? (
          mainCast.map((actor) => (
            <div key={actor.id} className={s["actor-card"]}>
              <img src={getActorPhotoUrl(actor.profile_path)} alt={actor.name} className={s["actor-photo"]} />
              <div>
                <p>{actor.name}</p>
                <p className={s["actor-character"]}>{actor.character}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No cast list</p>
        )}
      </div>
    </section>
  );
};
