import s from "./FilteredMovies.module.css";
import { MovieCard } from "@/shared/components/movieCard";
import { Pagination } from "@/shared/components/pagination/Pagination";
import { useGetMovieListQuery, useGetSortedMoviesQuery } from "@/shared/api/sharedApi";
import { SelectFilters } from "@/shared/components/selectFilters/SelectFilters";
import { useFilters } from "@/shared/hooks/useFilters";
import type { SortOption } from "@/shared/api/sharedApi.types";
import { RatingBar } from "@/features/ratingBar/RatingBar";

export function FilteredMovies() {
  const { filters, updateFilters, resetFilters } = useFilters();

  /*  // Дебаунс для рейтинга todo: подумать можно вынести в отдельный hook и отдельную компоненту для Rating
  const [tempRating, setTempRating] = useState<[number, number]>([
    filters["vote_average.gte"] || 0,
    filters["vote_average.lte"] || 10,
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (tempRating[0] !== filters["vote_average.gte"] || tempRating[1] !== filters["vote_average.lte"]) {
        updateFilters({
          "vote_average.gte": tempRating[0],
          "vote_average.lte": tempRating[1],
        });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [tempRating, filters, updateFilters]);*/

  const { data, isError } = useGetSortedMoviesQuery(filters);
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

  const handleSortChange = (sort_by: SortOption) => updateFilters({ sort_by, page: 1 });

  const handlePageChange = (page: number) => updateFilters({ page });

  if (isError) {
    return <div>Ошибка загрузки</div>;
  }
  return (
    <>
      <section className={s.container}>
        <aside className={s.filters}>
          <h3>Filter / Sort</h3>
          <SelectFilters value={filters?.sort_by || "popularity.desc"} onChange={handleSortChange} />
          <RatingBar minRating={filters["vote_average.gte"]!} maxRating={filters["vote_average.lte"]!} />
          <section className={s.tags}>
            {list &&
              list.genres.map((tag) => {
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
            <button className={s.reset} onClick={resetFilters}>
              Reset filters
            </button>
          </section>
        </aside>
        <div className={s["filtered-wrapper"]}>
          {data?.results && data.results.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        </div>
      </section>
      <Pagination
        currentPage={filters.page || 1}
        setCurrentPage={handlePageChange}
        pagesCount={data?.total_pages || 1}
      />
    </>
  );
}
