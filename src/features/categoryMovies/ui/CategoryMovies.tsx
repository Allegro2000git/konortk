import { useParams } from "react-router";
import { useCategoryMovies } from "@/shared/hooks/useCategoryMovies";
import { MovieCard } from "@/shared/components/movieCard";
import s from "./CategoryMovies.module.css";
import { NavLinkButton } from "@/shared/components/navLink/NavLinkButton";

export const CategoryMovies = () => {
  const { category = "popular" } = useParams();
  const { data, isLoading, isError } = useCategoryMovies(category);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Some error occurred...</div>;
  }

  return (
    <>
      <nav className={s.links}>
        <NavLinkButton to="/movies/popular">Popular Movies</NavLinkButton>
        <NavLinkButton to="/movies/top-rated">Top Rated Movies</NavLinkButton>
        <NavLinkButton to="/movies/upcoming">Upcoming Movies</NavLinkButton>
        <NavLinkButton to="/movies/now-playing">Now Playing Movies</NavLinkButton>
      </nav>
      <h2>{category} Movies</h2>
      <div className={s["category-wrapper"]}>
        {data?.results && data.results.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </>
  );
};
