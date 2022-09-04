import trpcClient from '@lib/trpcClient';
import type { Event, EventType } from '@prisma/client';
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

  const [eventsResource, { refetch }] = createResource(
    () => ({ year: year(), month: month() }),
    (query) => trpcClient.query('events', query)
  );

  const eventsByDate = createMemo(() =>
    mapEventsByDate(
      eventsResource.loading ? [] : (eventsResource() as Event[]),
      getMonthDates(year(), month())
    )
  );

  const createEvent = async (formData: FormData) => {
    const type = formData.get('type') as EventType;
    const startDateTime = new Date(formData.get('startDateTime') as string);
    const endDateTimeValue = formData.get('endDateTime') as string;
    const endDateTime = endDateTimeValue ? new Date(endDateTimeValue) : null;
    const title = formData.get('title') as string;
    const locationValue = formData.get('location') as string;
    const location = locationValue || null;
    const descriptionValue = formData.get('description') as string;
    const description = descriptionValue || null;
    await trpcClient.mutation('events', {
      type,
      startDateTime,
      endDateTime,
      title,
      location,
      description,
    });
    await refetch();
  };

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
    createEvent,
    navigateToPrevMonth,
    navigateToNextMonth,
  };
};

export type EventCalendarNavigator = ReturnType<
  typeof createEventCalendarNavigator
>;

export default createEventCalendarNavigator;
