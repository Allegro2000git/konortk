import s from "./CategoryMovies.module.css";
import { useState } from "react";
import type { Category } from "@/features/main/api/movieApi";
import { useCategoryMovies } from "@/shared/hooks";
import { MovieCard, NavLinkButton, Pagination } from "@/shared/components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import type { Movie } from "@/shared/types";

export const CategoryMovies = ({ category }: { category: string }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const apiCategory = category.replace("-", "_") as Category;
  const { data, isLoading } = useCategoryMovies(apiCategory, { page: currentPage });

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
        {isLoading
          ? Array.from({ length: 20 }).map((_, index) => (
              <div key={`skeleton-${index}`}>
                <Skeleton height={300} style={{ marginBottom: "1rem" }} />
                <Skeleton width={125} height={20} />
              </div>
            ))
          : data?.results && data.results.map((movie: Movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} pagesCount={data?.total_pages || 1} />
    </>
  );
};
