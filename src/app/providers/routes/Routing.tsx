import { Route, Routes } from "react-router";
import { PageNotFound } from "@/PageNotFound";
import { Favorites } from "@/Favorites";
import { FilteredMovies } from "@/FilteredMovies";
import { MainPage } from "@/features/main/ui/MainPage";
import { Layout } from "@/layout";
import { Search } from "@/features/search/ui/Search";
import { MovieDetails } from "@/shared/components/moviePage/MovieDetails";
import { CategoryMovies } from "@/features/categoryMovies/ui/CategoryMovies";

export const Path = {
  Main: "/",
  CategoryMovies: "/movies/:category",
  FilteredMovies: "/filtered-movies",
  Search: "/search",
  Favorites: "/favorites",
  MovieDetails: "/movie/:id",
  NotFound: "*",
} as const;

export const Routing = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MainPage />} />
        <Route path={Path.CategoryMovies} element={<CategoryMovies />} />
        <Route path={Path.MovieDetails} element={<MovieDetails />} />
        <Route path={Path.FilteredMovies} element={<FilteredMovies />} />
        <Route path={Path.Search} element={<Search />} />
        <Route path={Path.Favorites} element={<Favorites />} />

        <Route path={Path.NotFound} element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};
