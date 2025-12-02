import s from "./Header.module.css";
import { Link, NavLink } from "react-router";
import { Path } from "@/app/providers/routes/Routing";
import logo from "@/assets/vector/logo.svg";

export const Header = () => {
  const navItems = [
    { to: Path.Main, label: "Main" },
    { to: Path.Movies, label: "Category movies" },
    { to: Path.FilteredMovies, label: "Filtered movies" },
    { to: Path.Search, label: "Search" },
    { to: Path.Favorites, label: "Favorites" },
  ];

  return (
    <header className={s.header}>
      <div className={s.container}>
        <Link to={Path.Main}>
          <img src={logo} alt="Logo" className={s.logo} />
        </Link>
        <nav>
          <ul className={s.list}>
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className={({ isActive }) => `link ${isActive ? s.activeLink : ""}`}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <button>Theme</button>
      </div>
    </header>
  );
};
