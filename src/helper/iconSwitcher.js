export const iconSwitcher = (number, icon1, icon2) => {
  console.log("Number", number);
  console.log(icon1);
  console.log(icon2);
  if (number > 0) {
    return icon1;
  } else if (number < 0) {
    return icon2;
  } else {
    return icon1;
  }
};
