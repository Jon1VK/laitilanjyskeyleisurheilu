import { createEventCalendarNavigator } from '@hooks';
import EventCalendarHeader from './EventCalendarHeader';
import EventCalendarGrid from './EventCalendarGrid';
import EventCalendarWeekDayRow from './EventCalendarWeekDayRow';
import { splitProps } from 'solid-js';

const EventCalendar = (props: { year: number; month: number }) => {
  const [{ year, month }, _] = splitProps(props, ['year', 'month']);
  const eventCalendarNavigator = createEventCalendarNavigator(year, month);
  return (
    <div class="mt-12 rounded-t-lg shadow ring-1 ring-black/5">
      <EventCalendarHeader eventCalendarNavigator={eventCalendarNavigator} />
      <EventCalendarWeekDayRow />
      <EventCalendarGrid eventCalendarNavigator={eventCalendarNavigator} />
    </div>
  );
};

export default EventCalendar;
