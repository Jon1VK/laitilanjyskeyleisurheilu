import type { Event, EventType } from "@prisma/client";
import {
  Context,
  ParentComponent,
  createContext,
  createMemo,
  createResource,
  createSignal,
  useContext,
} from "solid-js";
import { api } from "~/services/api";
import {
  getCalendarDates,
  getMonthDates,
  getMonthEndDate,
  getMonthStartDate,
  toUTCTime,
} from "~/utils/dates";
import { mapEventsByDate } from "~/utils/events";

const createEventCalendarNavigator = (
  initialYear: number,
  initialMonth: number,
  initialEvents: Event[]
) => {
  const [year, setYear] = createSignal(initialYear);
  const [month, setMonth] = createSignal(initialMonth);
  const [selectedDate, selectDate] = createSignal(
    new Date().getFullYear() === initialYear &&
      new Date().getMonth() === initialMonth
      ? new Date()
      : new Date(initialYear, initialMonth)
  );

  const humanized = () => {
    return new Date(year(), month()).toLocaleDateString("fi", {
      year: "numeric",
      month: "long",
    });
  };

  const datetime = () => {
    return new Date(year(), month()).toLocaleDateString("sv").slice(0, 7);
  };

  const isInCurrentMonth = (date: Date) => {
    return date.getFullYear() === year() && date.getMonth() === month();
  };

  const calendarDates = createMemo(() => getCalendarDates(year(), month()));

  const [eventsResource, { refetch }] = createResource(
    () => ({
      startDate: getMonthStartDate(year(), month()),
      endDate: getMonthEndDate(year(), month()),
    }),
    (query) => api.event.getAll.query(query)
  );

  const eventsByDate = createMemo(() => {
    const events = eventsResource.loading
      ? initialEvents
      : (eventsResource() as Event[]);
    const monthDates = getMonthDates(year(), month());
    return mapEventsByDate(events, monthDates);
  });

  const createEvent = async (formData: FormData) => {
    const type = formData.get("type") as EventType;
    const startDateTime = new Date(formData.get("startDateTime") as string);
    const endDateTimeValue = formData.get("endDateTime") as string;
    const endDateTime = endDateTimeValue ? new Date(endDateTimeValue) : null;
    const title = formData.get("title") as string;
    const location = (formData.get("location") as string) || null;
    const externalUrl = (formData.get("externalUrl") as string) || null;
    const description = (formData.get("description") as string) || null;
    const pressStartBefore = Number(formData.get("pressStartBefore") as string);
    const pressEndBefore = Number(formData.get("pressEndBefore") as string);
    const pressBody = (formData.get("pressBody") as string) || null;
    await api.event.create.mutate({
      event: {
        type,
        startDateTime,
        endDateTime,
        title,
        location,
        externalUrl,
        description,
        pressBody,
      },
      pressRelease: {
        startBefore: pressStartBefore,
        endBefore: pressEndBefore,
      },
    });
    await refetch();
  };

  const deleteEvent = async (event: Event) => {
    await api.event.delete.mutate({ id: event.id });
    await refetch();
  };

  const createRecurringEvent = async (formData: FormData) => {
    const type = formData.get("type") as EventType;
    const weekdays = formData.getAll("weekdays").map(Number);
    const recurrenceStartDate = new Date(
      formData.get("recurrenceStartDate") as string
    );
    const recurrenceEndDate = new Date(
      formData.get("recurrenceEndDate") as string
    );
    const startTime = toUTCTime(formData.get("startDateTime") as string);
    const endTimeValue = formData.get("endDateTime") as string;
    const endTime = endTimeValue ? toUTCTime(endTimeValue) : null;
    const title = formData.get("title") as string;
    const location = (formData.get("location") as string) || null;
    const description = (formData.get("description") as string) || null;
    const pressStartBefore = Number(formData.get("pressStartBefore") as string);
    const pressEndBefore = Number(formData.get("pressEndBefore") as string);
    const pressBody = (formData.get("pressBody") as string) || null;
    await api.recurringEvent.create.mutate({
      event: {
        type,
        title,
        location,
        description,
        pressBody,
      },
      recurrence: {
        weekdays,
        startDate: recurrenceStartDate,
        endDate: recurrenceEndDate,
        startTime,
        endTime,
      },
      pressRelease: {
        startBefore: pressStartBefore,
        endBefore: pressEndBefore,
      },
    });
    await refetch();
  };

  const setYearAndMonth = (year: number, month: number) => {
    const date = new Date(year, month);
    const toYear = date.getFullYear();
    const toMonth = date.getMonth();
    window.history.replaceState(
      {},
      "",
      `?vuosi=${toYear}&kuukausi=${toMonth + 1}`
    );
    setYear(toYear);
    setMonth(toMonth);
    selectDate(new Date(toYear, toMonth));
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
    deleteEvent,
    createRecurringEvent,
    selectedDate,
    selectDate,
    navigateToPrevMonth,
    navigateToNextMonth,
  };
};

type EventCalendarNavigator = ReturnType<typeof createEventCalendarNavigator>;

const EventCalendarNavigatorContext =
  createContext() as Context<EventCalendarNavigator>;

const EventCalendarNavigatorProvider: ParentComponent<{
  initialYear: number;
  initialMonth: number;
  initialEvents: Event[];
}> = (props) => {
  const eventCalendarNavigator = createEventCalendarNavigator(
    props.initialYear,
    props.initialMonth,
    props.initialEvents
  );
  return (
    <EventCalendarNavigatorContext.Provider value={eventCalendarNavigator}>
      {props.children}
    </EventCalendarNavigatorContext.Provider>
  );
};

export default EventCalendarNavigatorProvider;

export const useEventCalendarNavigator = () =>
  useContext(EventCalendarNavigatorContext);
