import { useCategoryMovies } from "@/shared/hooks/useCategoryMovies";
import { MovieCard } from "@/shared/components/movieCard";
import s from "./CategoryMovies.module.css";
import { NavLinkButton } from "@/shared/components/navLink/NavLinkButton";
import { Pagination } from "@/shared/components/pagination/Pagination";
import { useState } from "react";
import type { Category } from "@/features/main/api/movieApi";

export const CategoryMovies = ({ category }: { category: string }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const apiCategory = category.replace("-", "_") as Category;
  const { data, isLoading, isError } = useCategoryMovies(apiCategory, { page: currentPage });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Some error occurred...</div>;
  }

  return (
    <>
      <nav className={s.links}>
        <NavLinkButton variant={"category"} to="/movies/popular">
          Popular Movies
        </NavLinkButton>
        <NavLinkButton variant={"category"} to="/movies/top-rated">
          Top Rated Movies
        </NavLinkButton>
        <NavLinkButton variant={"category"} to="/movies/upcoming">
          Upcoming Movies
        </NavLinkButton>
        <NavLinkButton variant={"category"} to="/movies/now-playing">
          Now Playing Movies
        </NavLinkButton>
      </nav>
      <h3>{category} movies</h3>
      <div className={s["category-wrapper"]}>
        {data?.results && data.results.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} pagesCount={data?.total_pages || 1} />
    </>
  );
};
