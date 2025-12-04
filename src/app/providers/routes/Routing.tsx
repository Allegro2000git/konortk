import { Route, Routes } from "react-router";
import { PageNotFound } from "@/PageNotFound";
import { Favorites } from "@/Favorites";
import { FilteredMovies } from "@/FilteredMovies";
import { Movies } from "@/Movies";
import { MainPage } from "@/features/main/ui/MainPage";
import { Layout } from "@/layout";
import { Search } from "@/features/search/ui/Search";

export const Path = {
  Main: "/",
  Movies: "/movies", // делится на под категории больше роутинг
  FilteredMovies: "/filtered-movies",
  Search: "/search",
  Favorites: "/favorites",
  NotFound: "*",
} as const;

export const Routing = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MainPage />} />

        <Route path={Path.Movies} element={<Movies />} />
        <Route path={Path.FilteredMovies} element={<FilteredMovies />} />

        <Route path={Path.Search} element={<Search />} />

        <Route path={Path.Favorites} element={<Favorites />} />

        <Route path={Path.NotFound} element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};
