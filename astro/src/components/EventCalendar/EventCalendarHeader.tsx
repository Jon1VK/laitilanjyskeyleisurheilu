import type { EventCalendarNavigator } from '@hooks';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'solid-icons/hi';
import { splitProps } from 'solid-js';

const EventCalendarHeader = (props: {
  eventCalendarNavigator: EventCalendarNavigator;
}) => {
  const [{ eventCalendarNavigator }, _] = splitProps(props, [
    'eventCalendarNavigator',
  ]);
  const { datetime, humanized, navigateToPrevMonth, navigateToNextMonth } =
    eventCalendarNavigator;
  return (
    <header class="flex items-center justify-between rounded-t-lg border-b border-gray-200 bg-blue-600 py-3 px-5 lg:flex-none">
      <h1 class="text-lg font-semibold text-white">
        <time class="inline-block first-letter:uppercase" datetime={datetime()}>
          {humanized()}
        </time>
      </h1>
      <div class="flex items-center rounded-md shadow-sm">
        <button
          type="button"
          onClick={navigateToPrevMonth}
          class="flex items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-white py-2 pl-2 pr-3 text-gray-400 hover:text-gray-500 focus:relative md:hover:bg-gray-50"
        >
          <span class="sr-only">Edellinen kuukausi</span>
          <HiOutlineChevronLeft class="h-5 w-5" />
        </button>
        <span class="relative -mx-px h-5 w-px bg-gray-300" />
        <button
          type="button"
          onClick={navigateToNextMonth}
          class="flex items-center justify-center rounded-r-md border border-l-0 border-gray-300 bg-white py-2 pl-2 pr-3 text-gray-400 hover:text-gray-500 focus:relative md:hover:bg-gray-50"
        >
          <span class="sr-only">Seuraava kuukausi</span>
          <HiOutlineChevronRight class="h-5 w-5" />
        </button>
      </div>
    </header>
  );
};

export default EventCalendarHeader;
