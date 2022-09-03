import trpcClient from '@lib/trpcClient';
import type { Event } from '@prisma/client';
import { getCalendarDates, getMonthDates } from '@utils/dates';
import { mapEventsByDate } from '@utils/events';
import { createMemo, createResource, createSignal } from 'solid-js';

const createEventCalendarNavigator = (
  defaultYear: number,
  defaultMonth: number
) => {
  const [year, setYear] = createSignal(defaultYear);
  const [month, setMonth] = createSignal(defaultMonth);

  const humanized = () =>
    new Date(year(), month()).toLocaleDateString('fi', {
      year: 'numeric',
      month: 'long',
    });

  const datetime = () =>
    new Date(year(), month()).toLocaleDateString('sv').slice(0, 7);

  const isInCurrentMonth = (date: Date) =>
    date.getFullYear() === year() && date.getMonth() === month();

  const calendarDates = createMemo(() => getCalendarDates(year(), month()));

  const [eventsResource] = createResource(
    () => ({ year: year(), month: month() }),
    (query) => trpcClient.query('events', query)
  );

  const eventsByDate = createMemo(() =>
    mapEventsByDate(
      eventsResource.loading ? [] : (eventsResource() as Event[]),
      getMonthDates(year(), month())
    )
  );

  const setYearAndMonth = (year: number, month: number) => {
    const date = new Date(year, month);
    const toYear = date.getFullYear();
    const toMonth = date.getMonth();
    window.history.pushState(
      {},
      '',
      `?vuosi=${toYear}&kuukausi=${toMonth + 1}`
    );
    setYear(toYear);
    setMonth(toMonth);
  };

  const navigateToPrevMonth = () => setYearAndMonth(year(), month() - 1);
  const navigateToNextMonth = () => setYearAndMonth(year(), month() + 1);

  return {
    humanized,
    datetime,
    isInCurrentMonth,
    calendarDates,
    eventsByDate,
    navigateToPrevMonth,
    navigateToNextMonth,
  };
};

export type EventCalendarNavigator = ReturnType<
  typeof createEventCalendarNavigator
>;

export default createEventCalendarNavigator;
