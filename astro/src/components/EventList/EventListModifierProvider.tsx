import trpcClient from '@lib/trpcClient';
import type { Event } from '@prisma/client';
import {
  Context,
  createContext,
  createSignal,
  ParentComponent,
  useContext,
} from 'solid-js';

const createEventListModifier = (initialEvents: Event[]) => {
  const [events, setEvents] = createSignal(initialEvents);

  const deleteEvent = async (eventToDelete: Event) => {
    await trpcClient.mutation('deleteEvent', eventToDelete.id);
    setEvents(events().filter((event) => event.id !== eventToDelete.id));
  };

  return {
    events,
    deleteEvent,
  };
};

type EventListModifier = ReturnType<typeof createEventListModifier>;

const EventListModifierContext = createContext() as Context<EventListModifier>;

const EventListModifierProvider: ParentComponent<{
  initialEvents: Event[];
}> = (props) => {
  const eventListModifier = () => createEventListModifier(props.initialEvents);
  return (
    <EventListModifierContext.Provider value={eventListModifier()}>
      {props.children}
    </EventListModifierContext.Provider>
  );
};

export default EventListModifierProvider;

export const useEventListModifier = () => useContext(EventListModifierContext);
