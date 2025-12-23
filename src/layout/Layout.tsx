import { Outlet } from "react-router";
import { Header } from "@/shared/components";
import s from "./Layout.module.css";
import { useAppSelector } from "@/shared/hooks";
import { selectThemeMode } from "@/app/providers/theme/model/theme-slice";

export const Layout = () => {
  const themeMode = useAppSelector(selectThemeMode);

  return (
    <div className={`${s.layout} ${themeMode}`}>
      <Header />
      <main className={s.main}>
        <div className={s.container}>
          <Outlet />
        </div>
      </main>
      <footer className={s.footer}>
        <span>© 2025 Kinopoisk Demo · Data courtesy of TMDB.</span>
      </footer>
    </div>
  );
};
