import { NavLink } from "react-router";
import s from "./NavLinkButton.module.css";

export const NavLinkButton = ({ to, children, variant }) => {
  const getClassName = ({ isActive }) => {
    const classes = [s.link];

    if (variant === "header") {
      classes.push(s.header);
    } else if (variant === "category") {
      classes.push(s.category);
    }

    if (isActive) {
      classes.push(s.active);
    }

    return classes.join(" ");
  };

  return (
    <NavLink to={to} className={getClassName}>
      {children}
    </NavLink>
  );
};
