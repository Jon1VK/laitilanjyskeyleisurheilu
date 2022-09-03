export const WEEKDAYS = [
  'maanantai',
  'tiistai',
  'keskiviikko',
  'torstai',
  'perjantai',
  'lauantai',
  'sunnuntai',
] as const;

export const getCalendarStartDate = (year: number, month: number) => {
  const startDate = new Date(year, month);
  while (startDate.getDay() !== 1) startDate.setDate(startDate.getDate() - 1);
  return startDate;
};

export const getCalendarEndDate = (year: number, month: number) => {
  const endDate = new Date(year, month + 1);
  while (endDate.getDay() !== 0) endDate.setDate(endDate.getDate() + 1);
  return endDate;
};

export const getCalendarDates = (year: number, month: number) => {
  const startDate = getCalendarStartDate(year, month);
  const endDate = getCalendarEndDate(year, month);
  const dates: Date[] = [];
  while (startDate <= endDate) {
    dates.push(new Date(startDate));
    startDate.setDate(startDate.getDate() + 1);
  }
  return dates;
};
