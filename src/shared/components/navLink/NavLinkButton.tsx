import { NavLink } from "react-router";
import s from "./NavLinkButton.module.css";
import type { MouseEvent, ReactNode } from "react";

type Props = {
  variant: "header" | "category";
  to: string;
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export const NavLinkButton = ({ to, children, variant, onClick }: Props) => {
  const getClassName = ({ isActive }: { isActive: boolean }) => {
    const classes = [s.link];

    if (variant === "header") {
      classes.push(s.header);
    } else if (variant === "category") {
      classes.push(s.category);
    } else {
      classes.push(s.default);
    }

    if (isActive) {
      classes.push(s.active);
    }

    return classes.join(" ");
  };

  return (
    <NavLink to={to} className={getClassName} onClick={onClick}>
      {children}
    </NavLink>
  );
};
