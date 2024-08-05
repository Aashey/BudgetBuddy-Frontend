import moment from "moment";
const getMonthBoundaries = (date) => {
  const startOfMonth = moment(date).startOf("month");
  const endOfMonth = moment(date).endOf("month");
  return { startOfMonth, endOfMonth };
};

const getDisabledDateFunction = (date) => {
  const { startOfMonth, endOfMonth } = getMonthBoundaries(date);

  return (current) => {
    return current && (current < startOfMonth || current > endOfMonth);
  };
};
