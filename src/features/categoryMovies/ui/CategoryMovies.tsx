import { useParams } from "react-router";
import { useCategoryMovies } from "@/shared/hooks/useCategoryMovies";
import { MovieCard } from "@/shared/components/movieCard";
import s from "./CategoryMovies.module.css";
import { NavLinkButton } from "@/shared/components/navLink/NavLinkButton";
import { Pagination } from "@/shared/components/pagination/Pagination";
import { useEffect, useRef, useState } from "react";

export const CategoryMovies = () => {
  const { category = "popular" } = useParams<{ category: string }>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const prevCategoryRef = useRef(category);

  const actualPage = category !== prevCategoryRef.current ? 1 : currentPage;

  const { data, isLoading, isError } = useCategoryMovies(category, {
    page: actualPage,
  });

  useEffect(() => {
    if (category !== prevCategoryRef.current) {
      prevCategoryRef.current = category;
    }
  }, [category]);

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
      <h3>{category} movies</h3>
      <div className={s["category-wrapper"]}>
        {data?.results && data.results.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
      <Pagination currentPage={actualPage} setCurrentPage={setCurrentPage} pagesCount={data?.total_pages || 1} />
    </>
  );
};
