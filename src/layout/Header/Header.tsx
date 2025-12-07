import s from "./Header.module.css";
import { Link, NavLink } from "react-router";
import { Path } from "@/app/providers/routes/Routing";
import logo from "@/assets/vector/logo.svg";
import { changeThemeModeAC, selectThemeMode } from "@/app/providers/theme/model/theme-slice";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/hooks/useAppSelector";

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode);
  const dispatch = useAppDispatch();

  const navItems = [
    { to: Path.Main, label: "Main" },
    { to: "/movies/popular", label: "Category movies" },
    { to: Path.FilteredMovies, label: "Filtered movies" },
    { to: Path.Search, label: "Search" },
    { to: Path.Favorites, label: "Favorites" },
  ];

  const changeMode = () => {
    const newTheme = themeMode === "dark" ? "light" : "dark";
    dispatch(changeThemeModeAC({ themeMode: newTheme }));
    document.body.className = newTheme;
  };

  return (
    <header>
      <div className={s.container}>
        <Link to={Path.Main}>
          <img src={logo} alt="Logo" className={s.logo} />
        </Link>
        <nav>
          <ul className={s.list}>
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className={s.link}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <button className={s["btn-theme"]} onClick={changeMode}>
          {themeMode === "light" ? "🌙" : "☀️"}
        </button>
      </div>
    </header>
  );
};
