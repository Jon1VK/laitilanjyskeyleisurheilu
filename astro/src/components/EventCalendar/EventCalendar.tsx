import type { Event } from "@prisma/client";
import EventCalendarGrid from "./EventCalendarGrid";
import EventCalendarHeader from "./EventCalendarHeader";
import EventCalendarMobileEventList from "./EventCalendarMobileEventList";
import EventCalendarNavigatorProvider from "./EventCalendarNavigatorProvider";

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

export default EventCalendar;
