import { CategoryMovies } from "@/features/categoryMovies/ui/CategoryMovies";
import { useParams } from "react-router";

export const CategoryMoviesPage = () => {
  const { category = "popular" } = useParams<{ category: string }>();
  return <CategoryMovies key={category} category={category} />;
};
