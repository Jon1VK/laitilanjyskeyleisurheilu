import type { Event } from '@prisma/client';
import { formattedDateTimePeriod } from '@utils/dates';
import { HiSolidClock } from 'solid-icons/hi';
import { For } from 'solid-js';

const EventList = (props: { events: Event[] }) => {
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
    <ol class="divide-y divide-gray-100 overflow-hidden rounded-lg bg-white text-sm shadow ring-1 ring-black/5">
      <For each={props.events}>
        {(event) => (
          <li>
            <a
              class="block p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-100"
              href={`/tapahtumat/${event.slug}#main`}
              rel="prefetch"
            >
              <p class="font-semibold text-gray-900">{event.title}</p>
              <p>{event.location}</p>
              <time
                datetime={event.startDateTime.toLocaleString('sv', {
                  timeZone: 'Europe/Helsinki',
                })}
                class="mt-2 flex items-center text-gray-700"
              >
                <HiSolidClock class={`mr-2 h-5 w-5 ${clockColor(event)}`} />
                {formattedDateTimePeriod(event)}
              </time>
            </a>
          </li>
        )}
      </For>
    </ol>
  );
};

export default EventList;
