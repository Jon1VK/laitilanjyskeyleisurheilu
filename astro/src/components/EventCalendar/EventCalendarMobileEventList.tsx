import EventListStateless from '../EventListStateless';
import { useEventCalendarNavigator } from './EventCalendarNavigatorProvider';

const EventCalendarMobileEventList = () => {
  const { eventsByDate, selectedDate, deleteEvent } =
    useEventCalendarNavigator();
  const events = () => eventsByDate().get(selectedDate().toDateString()) || [];
  return (
    <div class="px-4 py-10 sm:px-6 lg:hidden">
      <EventListStateless events={events()} onDelete={deleteEvent} />
    </div>
  );
};

export default EventCalendarMobileEventList;
