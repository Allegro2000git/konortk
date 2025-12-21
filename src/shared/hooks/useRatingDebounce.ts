import { useCallback, useRef } from "react";

export function useRatingDebounce(callback: (min: number, max: number) => void, delay?: number) {
  const timerRef = useRef<number | null>(null);

  return useCallback(
    (min: number, max: number) => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = window.setTimeout(() => {
        callback(min, max);
      }, delay || 200);
    },
    [callback, delay]
  );
}
