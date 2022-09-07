import type { Event } from '@prisma/client';
import { HiSolidClock } from 'solid-icons/hi';
import { For } from 'solid-js';
import { useEventCalendarNavigator } from './EventCalendarNavigatorProvider';

const EventCalendarMobileEventList = () => {
  const { eventsByDate, selectedDate } = useEventCalendarNavigator();
  const events = () => eventsByDate().get(selectedDate().toDateString()) || [];
  const timeString = ({ startDateTime, endDateTime }: Event) => {
    const startDateTimeOnly = !endDateTime;
    const startAndEndDateTimeOnSameDate =
      startDateTime.toDateString() === endDateTime?.toDateString();
    const startDateTimeString = startDateTime.toLocaleString('fi', {
      timeZone: 'Europe/Helsinki',
      dateStyle: 'short',
      timeStyle:
        startDateTimeOnly || startAndEndDateTimeOnSameDate
          ? 'short'
          : undefined,
    });
    const divider = startDateTimeOnly ? '' : ' - ';
    const endDateTimeString = endDateTime?.toLocaleString('fi', {
      timeZone: 'Europe/Helsinki',
      dateStyle: startAndEndDateTimeOnSameDate ? undefined : 'short',
      timeStyle: startAndEndDateTimeOnSameDate ? 'short' : undefined,
    });
    return `${startDateTimeString}${divider}${endDateTimeString || ''}`;
  };
  const clockColor = (event: Event) => {
    switch (event.type) {
      case 'PRACTICE':
        return 'text-blue-500';
      case 'COMPETITION':
        return 'text-red-500';
      case 'OTHER':
        return 'text-gray-400';
    }
  };
  return (
    <div class="py-10 px-4 sm:px-6 lg:hidden">
      <ol class="divide-y divide-gray-100 rounded-lg bg-white text-sm shadow ring-1 ring-black/5">
        <For each={events()}>
          {(event) => (
            <a href="/tapahtumat">
              <li class="p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-50">
                <p class="font-semibold text-gray-900">{event.title}</p>
                <p>{event.location}</p>
                <time
                  datetime={event.startDateTime.toLocaleString('sv', {
                    timeZone: 'Europe/Helsinki',
                  })}
                  class="mt-2 flex items-center text-gray-700"
                >
                  <HiSolidClock class={`mr-2 h-5 w-5 ${clockColor(event)}`} />
                  {timeString(event)}
                </time>
              </li>
            </a>
          )}
        </For>
      </ol>
    </div>
  );
};

export default EventCalendarMobileEventList;
