import type { Event } from '@prisma/client';
import EventListStateless from '../EventListStateless';
import EventListModifierProvider, {
  useEventListModifier,
} from './EventListModifierProvider';

const EventList = (props: { events: Event[] }) => (
  <EventListModifierProvider initialEvents={props.events}>
    <InternalEventList />
  </EventListModifierProvider>
);

const InternalEventList = () => {
  const { events, deleteEvent } = useEventListModifier();
  return <EventListStateless events={events()} onDelete={deleteEvent} />;
};

export default EventList;
