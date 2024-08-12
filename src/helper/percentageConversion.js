export const percentageConversion = (num1, num2) => {
  const res1 = num1 / num2;
  return (100 / res1).toFixed(2);
};
