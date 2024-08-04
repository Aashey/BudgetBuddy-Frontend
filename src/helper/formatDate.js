export const formatDate = (fullDate) => {
  const date = new Date(fullDate);
  const options = { month: "long", day: "numeric", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
};
