import s from "./GenresList.module.css";
import { useGetMovieListQuery } from "@/shared/api/sharedApi";
import type { DiscoverMoviesParams } from "@/shared/api/sharedApi.types";

type Props = {
  filters: DiscoverMoviesParams;
  updateFilters: (updates: Partial<DiscoverMoviesParams>) => void;
};

export const GenresList = ({ filters, updateFilters }: Props) => {
  const { data: list } = useGetMovieListQuery();

  const handleGenreClick = (genreId: number) => {
    const currentGenres = filters.with_genres ? filters.with_genres.split(",").map((el) => Number(el)) : [];

    const newGenres = currentGenres.includes(genreId)
      ? currentGenres.filter((id) => id !== genreId)
      : [...currentGenres, genreId];

    updateFilters({
      with_genres: newGenres.length > 0 ? newGenres.join(",") : undefined,
    });
  };

  return (
    <>
      {list?.genres.map((tag) => {
        const isSelected = filters.with_genres
          ? filters.with_genres
              .split(",")
              .map((el) => Number(el))
              .includes(tag.id)
          : false;

        return (
          <button
            className={`${s.tag} ${isSelected ? s.selected : ""}`}
            key={tag.id}
            onClick={() => handleGenreClick(tag.id)}
          >
            {tag.name}
          </button>
        );
      })}
    </>
  );
};
