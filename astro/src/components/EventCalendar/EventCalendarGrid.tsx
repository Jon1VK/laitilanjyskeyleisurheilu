import { For } from 'solid-js';
import EventCalendarDateNumber from './EventCalendarDateNumber';
import EventCalendarEventList from './EventCalendarEventList';
import { useEventCalendarNavigator } from './EventCalendarNavigatorProvider';

const EventCalendarGrid = () => (
  <div class="bg-gray-200 text-xs leading-6 text-gray-700">
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
            class={`min-h-[5rem] py-2 px-3 ${
              isInCurrentMonth(date) ? 'bg-white' : 'bg-gray-50 text-gray-500'
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

const EventCalendarMobileGrid = () => {
  const { isInCurrentMonth, calendarDates, eventsByDate } =
    useEventCalendarNavigator();
  return (
    <div class="grid w-full grid-cols-7 gap-px lg:hidden">
      <For each={calendarDates()}>
        {(date) => (
          <button
            type="button"
            class={`flex min-h-[3.5rem] flex-col py-2 px-3 hover:bg-gray-100 ${
              isInCurrentMonth(date) ? 'bg-white' : 'bg-gray-50 text-gray-500'
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
