import type { Event } from '@prisma/client';
import { For } from 'solid-js';

const dotColor = (event: Event) => {
  switch (event.type) {
    case 'PRACTICE':
      return 'bg-blue-500 group-hover:bg-blue-600';
    case 'COMPETITION':
      return 'bg-red-500 group-hover:bg-red-600';
    case 'OTHER':
      return 'bg-gray-400 group-hover:bg-blue-600';
  }
};

const hoverColor = (event: Event) =>
  event.type === 'COMPETITION'
    ? 'group-hover:text-red-600'
    : 'group-hover:text-blue-700';

const EventCalendarEventList = (props: { date: Date; events: Event[] }) => (
  <>
    <ol class="mt-2 hidden lg:block">
      <For each={props.events}>
        {(event) => <EventCalendarListItem date={props.date} event={event} />}
      </For>
    </ol>
    <div class="flex flex-wrap lg:hidden">
      <span class="sr-only">{props.events.length} tapahtumaa</span>
      <For each={props.events}>
        {(event) => (
          <span class={`m-0.5 h-1.5 w-1.5 rounded-full ${dotColor(event)}`} />
        )}
      </For>
    </div>
  </>
);

const EventCalendarListItem = (props: { date: Date; event: Event }) => (
  <li>
    <a href="/" class="group hidden items-center lg:flex">
      <span class={`mr-2 h-1.5 w-1.5 rounded-full ${dotColor(props.event)}`} />
      <p
        class={`flex-auto truncate font-medium text-gray-900 ${hoverColor(
          props.event
        )}`}
      >
        {props.event.title}
      </p>
      <time
        datetime={props.event.startDateTime.toLocaleString('sv', {
          timeZone: 'utc',
        })}
        class={`ml-3 hidden flex-none xl:block ${hoverColor(props.event)}`}
      >
        {props.date.toDateString() === props.event.startDateTime.toDateString()
          ? props.event.startDateTime.toLocaleTimeString('fi', {
              timeZone: 'utc',
              timeStyle: 'short',
            })
          : '--:--'}
      </time>
    </a>
  </li>
);

export default EventCalendarEventList;
