import { createEventCalendarNavigator } from '@hooks';
import EventCalendarHeader from './EventCalendarHeader';
import EventCalendarGrid from './EventCalendarGrid';
import EventCalendarWeekDayRow from './EventCalendarWeekDayRow';
import { splitProps } from 'solid-js';
import type { Event } from '@prisma/client';

const EventCalendar = (props: {
  year: number;
  month: number;
  events: Event[];
}) => {
  const [{ year, month, events }, _] = splitProps(props, [
    'year',
    'month',
    'events',
  ]);
  const eventCalendarNavigator = createEventCalendarNavigator(
    year,
    month,
    events
  );
  return (
    <div class="mt-12 rounded-t-lg shadow ring-1 ring-black/5">
      <EventCalendarHeader eventCalendarNavigator={eventCalendarNavigator} />
      <EventCalendarWeekDayRow />
      <EventCalendarGrid eventCalendarNavigator={eventCalendarNavigator} />
    </div>
  );
};

export default EventCalendar;
