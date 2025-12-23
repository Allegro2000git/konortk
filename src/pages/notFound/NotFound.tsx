import { NavLinkButton } from "@/shared/components";
import s from "./NotFound.module.css";
import not from "@/assets/images/notFound.jpg";

export function NotFound() {
  return (
    <div className={s.container}>
      <img className={s.image} src={not} alt={"not found image"} />
      <p className={s.text}>You tried to request a page that doesn't exist...</p>
      <NavLinkButton to={"/"} variant={"category"}>
        To main page...
      </NavLinkButton>
    </div>
  );
}
