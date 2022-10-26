export const getMonthAndYearFromDate = (date: Date) => {
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${month}-${year}`;
};
