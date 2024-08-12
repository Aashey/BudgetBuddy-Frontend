export const formatDate = (fullDate) => {
  const date = new Date(fullDate);
  const options = { month: "short", day: "numeric", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

export const formatDate_WithMonth = (fullDate) => {
  const date = new Date(fullDate);
  const options = { month: "long" };
  return date.toLocaleDateString("en-US", options);
};
