import s from "./CategoryMovies.module.css";
import { useState } from "react";
import type { Category } from "@/features/main/api/movieApi";
import { useCategoryMovies } from "@/shared/hooks";
import { MovieCard, NavLinkButton, Pagination } from "@/shared/components";

export const CategoryMovies = ({ category }: { category: string }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const apiCategory = category.replace("-", "_") as Category;
  const { data } = useCategoryMovies(apiCategory, { page: currentPage });

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
