import { Outlet } from "react-router";
import { Header } from "@/layout/Header";
import s from "./Layout.module.css";

export const Layout = () => {
  return (
    <div className={s.layout}>
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
