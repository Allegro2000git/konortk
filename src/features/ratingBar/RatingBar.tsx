import s from "./RatingBar.module.css";

type Props = {
  minRating: number;
  maxRating: number;
};

export const RatingBar = ({ minRating = 0.0, maxRating = 10.0 }: Props) => {
  return (
    <div className={s.rating}>
      <span>Rating</span>
      <span>{`${minRating?.toFixed(1)} - ${maxRating?.toFixed(1)}`}</span>
    </div>
  );
};
