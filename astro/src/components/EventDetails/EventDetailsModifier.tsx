import trpcClient from '@lib/trpcClient';
import type { Event } from '@prisma/client';
import {
  Context,
  createContext,
  createSignal,
  ParentComponent,
  useContext,
} from 'solid-js';
import type { EventWithOccurrences } from './types';

const createEventDetailsModifier = (initialEvent: EventWithOccurrences) => {
  const [event, setEvent] = createSignal(initialEvent);

  const deleteEvent = async () => {
    await trpcClient.mutation('deleteEvent', event().id);
    window.location.href = '/tapahtumat';
  };

  const deleteOccurrence = async (occurrenceToDelete: Event) => {
    await trpcClient.mutation('deleteEvent', occurrenceToDelete.id);
    const recurringEvent = event().RecurringEvent;
    if (!recurringEvent) return;
    const remainingOccurrences = recurringEvent.occurrences.filter(
      (occurrence) => occurrence.id !== occurrenceToDelete.id
    );
    setEvent({
      ...event(),
      RecurringEvent: {
        ...recurringEvent,
        occurrences: remainingOccurrences,
      },
    });
  };

  const updateEvent = async (event: Event, formData: FormData) => {
    const startDateTime = new Date(formData.get('startDateTime') as string);
    const endDateTimeValue = formData.get('endDateTime') as string;
    const endDateTime = endDateTimeValue ? new Date(endDateTimeValue) : null;
    const location = (formData.get('location') as string) || null;
    const description = (formData.get('description') as string) || null;
    const updatedEvent = await trpcClient.mutation('updateEvent', {
      id: event.id,
      startDateTime,
      endDateTime,
      location,
      description,
    });
    setEvent(updatedEvent);
  };

  return {
    event,
    updateEvent,
    deleteEvent,
    deleteOccurrence,
  };
};

type EventDetailsModifier = ReturnType<typeof createEventDetailsModifier>;

const EventDetailsModifierContext =
  createContext() as Context<EventDetailsModifier>;

const EventDetailsModifierProvider: ParentComponent<{
  initialEvent: EventWithOccurrences;
}> = (props) => {
  const eventDetailsModifier = () =>
    createEventDetailsModifier(props.initialEvent);
  return (
    <EventDetailsModifierContext.Provider value={eventDetailsModifier()}>
      {props.children}
    </EventDetailsModifierContext.Provider>
  );
};

export default EventDetailsModifierProvider;

export const useEventDetailsModifier = () =>
  useContext(EventDetailsModifierContext);
