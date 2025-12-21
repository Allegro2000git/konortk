import s from "./RatingBar.module.css";
import { type ChangeEvent, useEffect, useState } from "react";

type Props = {
  minRating: number;
  maxRating: number;
  onRatingChange: (minRating: number, maxRating: number) => void;
};

export const RatingBar = ({ minRating, maxRating, onRatingChange }: Props) => {
  const [min, setMin] = useState<number>(minRating);
  const [max, setMax] = useState<number>(maxRating);

  useEffect(() => {
    setMin(minRating);
    setMax(maxRating);
  }, [minRating, maxRating]);

  const handleMinChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    const clampedValue = Math.min(value, max - 0.1);
    setMin(clampedValue);
    onRatingChange(clampedValue, max);
  };

  const handleMaxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    const clampedValue = Math.max(value, min + 0.1);
    setMax(clampedValue);
    onRatingChange(min, clampedValue);
  };

  const minPercent = (min / 10) * 100;
  const maxPercent = (max / 10) * 100;

  return (
    <div className={s.container}>
      <div className={s["rating-header"]}>
        <span>Rating</span>
        <span>
          {min.toFixed(1)} - {max.toFixed(1)}
        </span>
      </div>
      <div className={s["slider-container"]} data-no-global-styles="true">
        <div className={s.track}></div>
        <div
          className={s.progress}
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        ></div>
        <input type="range" min="0" max="10" step="0.1" value={min} onChange={handleMinChange} className={s.slider} />
        <input type="range" min="0" max="10" step="0.1" value={max} onChange={handleMaxChange} className={s.slider} />
      </div>
    </div>
  );
};
