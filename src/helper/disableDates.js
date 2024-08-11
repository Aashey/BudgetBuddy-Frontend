import dayjs from "dayjs";

export const disableAfterToday = (current) => {
  return current && current > dayjs().endOf("day");
};
export const disablePrevMonth = (current) => {
  return current && current < dayjs().startOf("month");
};

export const disableAfterToday_AndPrevMonth = (current) => {
  return (
    current &&
    (current > dayjs().endOf("day") || current < dayjs().startOf("month"))
  );
};
