import s from "./Header.module.css";
import { Link } from "react-router";
import { Path } from "@/app/providers/routes/Routing";
import logo from "@/assets/vector/logo.svg";
import { changeThemeModeAC, selectThemeMode } from "@/app/providers/theme/model/theme-slice";
import { NavLinkButton } from "@/shared/components";
import { useAppDispatch, useAppSelector } from "@/shared/hooks";

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode);
  const dispatch = useAppDispatch();

  const navItems = [
    { to: Path.Main, label: "Main" },
    { to: Path.CategoryMoviesPopular, label: "Category movies" },
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
                <NavLinkButton variant={"header"} to={item.to}>
                  {item.label}
                </NavLinkButton>
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
