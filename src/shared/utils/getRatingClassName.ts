export const getRatingClassName = (rating: number): "high" | "medium" | "low" => {
  if (rating >= 7) {
    return "high";
  } else if (rating >= 5) {
    return "medium";
  }
  return "low";
};
