export const WEEKDAYS = [
  'Maanantai',
  'Tiistai',
  'Keskiviikko',
  'Torstai',
  'Perjantai',
  'Lauantai',
  'Sunnuntai',
];

export const getCalendarDates = (year: number, month: number) => {
  // Find calendar first monday
  const startDate = new Date(year, month);
  while (startDate.getDay() !== 1) startDate.setDate(startDate.getDate() - 1);
  // Find calendar last sunday
  const endDate = new Date(year, month + 1);
  while (endDate.getDay() !== 0) endDate.setDate(endDate.getDate() + 1);
  // Get all dates for the calendar
  const dates: Date[] = [];
  while (startDate <= endDate) {
    dates.push(new Date(startDate));
    startDate.setDate(startDate.getDate() + 1);
  }
  return dates;
};
