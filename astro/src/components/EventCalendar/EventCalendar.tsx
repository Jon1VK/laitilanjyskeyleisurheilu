import EventCalendarHeader from './EventCalendarHeader';
import EventCalendarGrid from './EventCalendarGrid';
import type { Event } from '@prisma/client';
import EventCalendarNavigatorProvider, {
  useEventCalendarNavigator,
} from './EventCalendarNavigatorProvider';
import EventList from '../EventList';

const EventCalendar = (props: {
  year: number;
  month: number;
  events: Event[];
}) => (
  <EventCalendarNavigatorProvider
    initialYear={props.year}
    initialMonth={props.month}
    initialEvents={props.events}
  >
    <div class="mt-12 rounded-t-lg shadow ring-1 ring-black/5">
      <EventCalendarHeader />
      <EventCalendarGrid />
    </div>
    <EventCalendarMobileEventList />
  </EventCalendarNavigatorProvider>
);

const EventCalendarMobileEventList = () => {
  const { eventsByDate, selectedDate } = useEventCalendarNavigator();
  const events = () => eventsByDate().get(selectedDate().toDateString()) || [];
  return (
    <div class="py-10 px-4 sm:px-6 lg:hidden">
      <EventList events={events()} />
    </div>
  );
};

export default EventCalendar;
