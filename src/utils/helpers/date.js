import dayjs from "dayjs";

export const format = (date, formatType) => {
  if (!date) {
    return "";
  }

  return dayjs(date).format(formatType);
};
