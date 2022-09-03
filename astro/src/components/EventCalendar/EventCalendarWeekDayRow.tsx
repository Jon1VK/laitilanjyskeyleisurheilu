import { WEEKDAYS } from '@utils/dates';
import { For } from 'solid-js';

const EventCalendarWeekDayRow = () => (
  <div class="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700">
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
);

export default EventCalendarWeekDayRow;
