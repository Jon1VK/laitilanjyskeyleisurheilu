import { useAuth } from '@auth';
import type { Event } from '@prisma/client';
import { formattedDateTimePeriod } from '@utils/dates';
import { HiOutlineTrash, HiSolidClock } from 'solid-icons/hi';
import { For, Show } from 'solid-js';

const EventList = (props: {
  events: Event[];
  onDelete: (event: Event) => void;
}) => {
  const { isAdmin } = useAuth();
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
          <li class="group relative focus-within:bg-gray-50 hover:bg-gray-100">
            <a
              class="block p-4 pr-6"
              href={`/tapahtumat/${event.slug}#main`}
              rel="prefetch"
            >
              <div>
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
              </div>
            </a>
            <Show when={isAdmin()}>
              <div class="absolute right-6 top-0 flex h-full items-center">
                <button
                  onClick={() => props.onDelete(event)}
                  class="rounded-md border border-gray-300 bg-white p-2 font-semibold text-gray-700 opacity-0 shadow-sm hover:bg-red-600 hover:text-white focus:bg-red-600 focus:text-white focus:opacity-100 group-hover:opacity-100"
                >
                  <HiOutlineTrash class="h-5 w-5" />
                  <span class="sr-only">Poista {event.slug}</span>
                </button>
              </div>
            </Show>
          </li>
        )}
      </For>
    </ol>
  );
};

export default EventList;
