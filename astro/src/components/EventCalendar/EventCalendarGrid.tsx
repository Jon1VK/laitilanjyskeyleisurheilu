import type { EventCalendarNavigator } from '@hooks';
import { For, splitProps } from 'solid-js';
import EventCalendarDateNumber from './EventCalendarDateNumber';
import EventCalendarEventList from './EventCalendarEventList';

const EventCalendarGrid = (props: {
  eventCalendarNavigator: EventCalendarNavigator;
}) => (
  <div class="bg-gray-200 text-xs leading-6 text-gray-700">
    <EventCalendarLaptopGrid
      eventCalendarNavigator={props.eventCalendarNavigator}
    />
    <EventCalendarMobileGrid
      eventCalendarNavigator={props.eventCalendarNavigator}
    />
  </div>
);

const EventCalendarLaptopGrid = (props: {
  eventCalendarNavigator: EventCalendarNavigator;
}) => {
  const [{ eventCalendarNavigator }, _] = splitProps(props, [
    'eventCalendarNavigator',
  ]);
  const { inMonth, calendarDates, eventsByDate } = eventCalendarNavigator;
  return (
    <div class="hidden w-full grid-cols-7 gap-px lg:grid">
      <For each={calendarDates()}>
        {(date) => (
          <div
            class={`min-h-[5rem] py-2 px-3 ${
              inMonth(date) ? 'bg-white' : 'bg-gray-50 text-gray-500'
            }`}
          >
            <EventCalendarDateNumber date={date} />
            <EventCalendarEventList
              date={date}
              events={eventsByDate().get(date.toDateString()) || []}
            />
          </div>
        )}
      </For>
    </div>
  );
};

const EventCalendarMobileGrid = (props: {
  eventCalendarNavigator: EventCalendarNavigator;
}) => {
  const [{ eventCalendarNavigator }, _] = splitProps(props, [
    'eventCalendarNavigator',
  ]);
  const { inMonth, calendarDates, eventsByDate } = eventCalendarNavigator;
  return (
    <div class="grid w-full grid-cols-7 gap-px lg:hidden">
      <For each={calendarDates()}>
        {(date) => (
          <button
            type="button"
            class={`flex min-h-[3.5rem] flex-col py-2 px-3 hover:bg-gray-100 ${
              inMonth(date) ? 'bg-white' : 'bg-gray-50 text-gray-500'
            }`}
          >
            <EventCalendarDateNumber date={date} />
            <EventCalendarEventList
              date={date}
              events={eventsByDate().get(date.toDateString()) || []}
            />
          </button>
        )}
      </For>
    </div>
  );
};

export default EventCalendarGrid;
