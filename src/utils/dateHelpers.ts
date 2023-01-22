export const getMonthAndYearFromDate = (date: Date) => {
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${month}-${year}`;
};

export const getLastMonths = (numberOfMonths: number) => {
  const months = [];
  for (let i = 0; i < numberOfMonths; i++) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const key = getMonthAndYearFromDate(date);
    const monthNumber = parseInt(key.split("-")[0]);
    const month = getMonthShortForm(monthNumber);
    const label = `${month} '${date.getFullYear().toString().slice(-2)}`;
    months.push({ key, label });
  }
  return months.reverse();
};

const getMonthShortForm = (month: number) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months[month - 1];
};
