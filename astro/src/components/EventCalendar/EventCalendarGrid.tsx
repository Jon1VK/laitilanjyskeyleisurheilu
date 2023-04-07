import type { Event } from "@prisma/client";
import { For } from "solid-js";
import { WEEKDAYS } from "~/utils/dates";
import { useEventCalendarNavigator } from "./EventCalendarNavigatorProvider";

const EventCalendarGrid = () => (
  <div class="bg-gray-200 text-xs leading-6 text-gray-700">
    <div class="grid grid-cols-7 gap-px border-b border-gray-200 text-center font-semibold">
      <For each={WEEKDAYS}>
        {(weekday) => (
          <div class="bg-white py-2">
            <span class="inline-block first-letter:uppercase">
              {weekday.charAt(0)}
            </span>
            <span class="sr-only sm:not-sr-only">{weekday.slice(1)}</span>
          </div>
        )}
      </For>
    </div>
    <EventCalendarLaptopGrid />
    <EventCalendarMobileGrid />
  </div>
);

const EventCalendarLaptopGrid = () => {
  const { isInCurrentMonth, calendarDates, eventsByDate } =
    useEventCalendarNavigator();
  return (
    <div class="hidden w-full grid-cols-7 gap-px lg:grid">
      <For each={calendarDates()}>
        {(date) => (
          <div
            class={`min-h-[5rem] px-3 py-2 ${
              isInCurrentMonth(date) ? "bg-white" : "bg-gray-50 text-gray-500"
            }`}
          >
            <EventCalendarGridDateNumber date={date} />
            <EventCalendarGridEventList
              date={date}
              events={eventsByDate().get(date.toDateString()) || []}
            />
          </div>
        )}
      </For>
    </div>
  );
};

const EventCalendarMobileGrid = () => {
  const { isInCurrentMonth, calendarDates, eventsByDate, selectDate } =
    useEventCalendarNavigator();
  return (
    <div class="grid w-full grid-cols-7 gap-px lg:hidden">
      <For each={calendarDates()}>
        {(date) => (
          <button
            type="button"
            onClick={() => selectDate(date)}
            class={`flex min-h-[3.5rem] flex-col px-3 py-2 hover:bg-gray-100 ${
              isInCurrentMonth(date) ? "bg-white" : "bg-gray-50 text-gray-500"
            }`}
          >
            <EventCalendarGridDateNumber date={date} mobile />
            <EventCalendarGridEventList
              date={date}
              events={eventsByDate().get(date.toDateString()) || []}
            />
          </button>
        )}
      </For>
    </div>
  );
};

const EventCalendarGridDateNumber = (props: {
  date: Date;
  mobile?: boolean;
}) => {
  const { selectedDate } = useEventCalendarNavigator();
  const timeStyle = (date: Date) => {
    const localeDate = date.toLocaleDateString("sv", {
      timeZone: "Europe/Helsinki",
    });
    const currentLocaleDate = new Date().toLocaleDateString("sv", {
      timeZone: "Europe/Helsinki",
    });
    if (props.mobile && selectedDate().toDateString() === date.toDateString()) {
      return "flex h-6 w-6 items-center justify-center rounded-full bg-gray-700 font-semibold text-white";
    }
    if (localeDate === currentLocaleDate) {
      return "font-semibold text-blue-600 lg:-ml-1.5 lg:flex lg:h-6 lg:w-6 lg:items-center lg:justify-center lg:rounded-full lg:bg-blue-600 lg:text-white";
    }
  };
  return (
    <time
      class={timeStyle(props.date)}
      datetime={props.date.toLocaleDateString("sv")}
    >
      {props.date.getDate()}
    </time>
  );
};

const EventCalendarGridEventList = (props: { date: Date; events: Event[] }) => {
  const dotColor = (event: Event) => {
    switch (event.type) {
      case "PRACTICE":
        return "bg-blue-500 group-hover:bg-blue-600";
      case "COMPETITION":
        return "bg-red-500 group-hover:bg-red-600";
      case "OTHER":
        return "bg-gray-400 group-hover:bg-blue-600";
    }
  };
  const hoverColor = (event: Event) => {
    return event.type === "COMPETITION"
      ? "group-hover:text-red-600"
      : "group-hover:text-blue-700";
  };
  return (
    <>
      <ol class="mt-2 hidden lg:block">
        <For each={props.events}>
          {(event) => (
            <li>
              <a
                href={`/tapahtumat/${event.slug}#main`}
                class="group hidden items-center lg:flex"
                rel="prefetch"
              >
                <span
                  class={`mr-2 h-1.5 w-1.5 shrink-0 rounded-full ${dotColor(
                    event
                  )}`}
                />
                <p
                  class={`flex-auto truncate font-medium text-gray-900 ${hoverColor(
                    event
                  )}`}
                >
                  {event.title}
                </p>
                <time
                  datetime={event.startDateTime.toLocaleString("sv", {
                    timeZone: "Europe/Helsinki",
                  })}
                  class={`ml-3 hidden flex-none xl:block ${hoverColor(event)}`}
                >
                  {props.date.toDateString() ===
                    event.startDateTime.toDateString() &&
                    event.startDateTime.toLocaleTimeString("fi", {
                      timeZone: "Europe/Helsinki",
                      timeStyle: "short",
                    })}
                </time>
              </a>
            </li>
          )}
        </For>
      </ol>
      <div class="ml-2 mt-2 flex flex-wrap lg:hidden">
        <span class="sr-only">{props.events.length} tapahtumaa</span>
        <For each={props.events}>
          {(event) => (
            <span class={`m-0.5 h-1.5 w-1.5 rounded-full ${dotColor(event)}`} />
          )}
        </For>
      </div>
    </>
  );
};

export default EventCalendarGrid;
