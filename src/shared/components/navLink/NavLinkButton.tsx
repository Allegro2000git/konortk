import { NavLink } from "react-router";
import s from "./NavLinkButton.module.css";

export const NavLinkButton = ({ to, children }) => {
  return (
    <NavLink to={to} className={({ isActive }) => (isActive ? `${s.link} ${s.active}` : s.link)}>
      {children}
    </NavLink>
  );
};
