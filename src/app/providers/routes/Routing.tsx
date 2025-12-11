import { Route, Routes } from "react-router";
import { PageNotFound } from "@/PageNotFound";
import { Favorites } from "@/pages/favoritePage/Favorites";
import { FilteredMovies } from "@/FilteredMovies";
import { Layout } from "@/layout";
import { MovieDetails } from "@/pages/moviePage/MovieDetails";
import { CategoryMoviesPage } from "@/pages/categoryMoviesPage/categoryMoviesPage";
import { Search } from "@/pages/searchPage/Search";
import { MainPage } from "@/pages/mainPage/MainPage";

export const Path = {
  Main: "/",
  CategoryMovies: "/movies/:category",
  CategoryMoviesPopular: "/movies/popular",
  FilteredMovies: "/filtered-movies",
  Search: "/searchPage",
  Favorites: "/favorites",
  MovieDetails: "/movie/:id",
  NotFound: "*",
} as const;

export const Routing = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MainPage />} />
        <Route path={Path.CategoryMovies} element={<CategoryMoviesPage />} />
        <Route path={Path.MovieDetails} element={<MovieDetails />} />
        <Route path={Path.FilteredMovies} element={<FilteredMovies />} />
        <Route path={Path.Search} element={<Search />} />
        <Route path={Path.Favorites} element={<Favorites />} />

        <Route path={Path.NotFound} element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};
