export const WEEKDAYS = [
  "maanantai",
  "tiistai",
  "keskiviikko",
  "torstai",
  "perjantai",
  "lauantai",
  "sunnuntai",
] as const;

export const getMonthStartDate = (year: number, month: number) => {
  return new Date(year, month);
};

export const getMonthEndDate = (year: number, month: number) => {
  return new Date(year, month + 1, 1, 0, 0, 0, -1);
};

const getCalendarStartDate = (year: number, month: number) => {
  const startDate = getMonthStartDate(year, month);
  while (startDate.getDay() !== 1) startDate.setDate(startDate.getDate() - 1);
  return startDate;
};

const getCalendarEndDate = (year: number, month: number) => {
  const endDate = getMonthEndDate(year, month);
  while (endDate.getDay() !== 0) endDate.setDate(endDate.getDate() + 1);
  return endDate;
};

export const getDatesBetween = (startDate: Date, endDate: Date) => {
  const start = new Date(startDate.toDateString());
  const dates: Date[] = [];
  while (start <= endDate) {
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
  const startDate = getMonthStartDate(year, month);
  const endDate = getMonthEndDate(year, month);
  const dates = getDatesBetween(startDate, endDate);
  return dates;
};

export const formattedDateTimePeriod = (
  {
    startDateTime,
    endDateTime,
  }: {
    startDateTime: Date;
    endDateTime?: Date | null;
  },
  dateStyle: "short" | "long" = "long"
) => {
  const startDateTimeOnly = !endDateTime;
  const startAndEndDateTimeOnSameDate =
    startDateTime.toDateString() === endDateTime?.toDateString();
  const startDateTimeString = startDateTime.toLocaleString("fi", {
    timeZone: "Europe/Helsinki",
    dateStyle: dateStyle,
    timeStyle:
      startDateTimeOnly || startAndEndDateTimeOnSameDate ? "short" : undefined,
  });
  const divider = startDateTimeOnly ? "" : " - ";
  const endDateTimeString = endDateTime?.toLocaleString("fi", {
    timeZone: "Europe/Helsinki",
    dateStyle: startAndEndDateTimeOnSameDate ? undefined : dateStyle,
    timeStyle: startAndEndDateTimeOnSameDate ? "short" : undefined,
  });
  return `${startDateTimeString}${divider}${endDateTimeString || ""}`;
};

export const toUTCTime = (time: string) => {
  const currentDateString = new Date().toLocaleDateString("sv");
  return new Date(`${currentDateString} ${time}`).toLocaleTimeString("sv", {
    timeZone: "utc",
  });
};

export const getDayCountBetween = (startDate: Date, endDate: Date) => {
  const ONE_DAY_MS = 24 * 60 * 60 * 1000;
  const differenceMs = endDate.getTime() - startDate.getTime();
  return Math.floor(differenceMs / ONE_DAY_MS);
};
