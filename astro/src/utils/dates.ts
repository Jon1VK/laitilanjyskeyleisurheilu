export const WEEKDAYS = [
  'maanantai',
  'tiistai',
  'keskiviikko',
  'torstai',
  'perjantai',
  'lauantai',
  'sunnuntai',
] as const;

const getCalendarStartDate = (year: number, month: number) => {
  const startDate = new Date(year, month);
  while (startDate.getDay() !== 1) startDate.setDate(startDate.getDate() - 1);
  return startDate;
};

const getCalendarEndDate = (year: number, month: number) => {
  const endDate = new Date(year, month + 1, 0);
  while (endDate.getDay() !== 0) endDate.setDate(endDate.getDate() + 1);
  return endDate;
};

const getDatesBetween = (startDate: Date, endDate: Date) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const dates: Date[] = [];
  while (start <= end) {
    dates.push(new Date(start));
    start.setDate(start.getDate() + 1);
  }
  return dates;
};

export const getCalendarDates = (year: number, month: number) => {
  const startDate = getCalendarStartDate(year, month);
  const endDate = getCalendarEndDate(year, month);
  const dates = getDatesBetween(startDate, endDate);
  return dates;
};

export const getMonthDates = (year: number, month: number) => {
  const startDate = new Date(year, month);
  const endDate = new Date(year, month + 1, 0);
  const dates = getDatesBetween(startDate, endDate);
  return dates;
};
