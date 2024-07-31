export const filterData = (data, searchValue) => {
  if (!searchValue) {
    return null;
  }
  const search = searchValue.toLowerCase();
  return data.filter((item) => {
    item.title.toLowerCase().includes(search);
  });
};
