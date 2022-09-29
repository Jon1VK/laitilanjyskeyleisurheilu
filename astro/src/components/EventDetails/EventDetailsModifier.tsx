import supabaseClient from '@lib/supabaseClient';
import trpcClient from '@lib/trpcClient';
import type { Event } from '@prisma/client';
import { parameterize } from 'inflected';
import {
  Context,
  createContext,
  createSignal,
  ParentComponent,
  useContext,
} from 'solid-js';
import type {
  EventWithOccurrences,
  RecurringEventWithOccurrences,
} from './types';

const createEventDetailsModifier = (initialEvent: EventWithOccurrences) => {
  const [event, setEvent] = createSignal(initialEvent);

  const deleteEvent = async () => {
    await trpcClient.mutation('deleteEvent', event().id);
    window.location.href = '/tapahtumat#main';
  };

  const deleteOccurrence = async (occurrenceToDelete: Event) => {
    await trpcClient.mutation('deleteEvent', occurrenceToDelete.id);
    const recurringEvent = event().recurringEvent;
    if (!recurringEvent) return;
    const occurrences = recurringEvent.occurrences.filter(
      (occurrence) => occurrence.id !== occurrenceToDelete.id
    );
    setEvent({
      ...event(),
      recurringEvent: { ...recurringEvent, occurrences },
    });
  };

  const createOccurrence = async (formData: FormData) => {
    const startDateTime = new Date(formData.get('startDateTime') as string);
    const endDateTimeValue = formData.get('endDateTime') as string;
    const endDateTime = endDateTimeValue ? new Date(endDateTimeValue) : null;
    const title = formData.get('title') as string;
    const location = (formData.get('location') as string) || null;
    const description = (formData.get('description') as string) || null;
    const pressStartBefore = Number(formData.get('pressStartBefore') as string);
    const pressEndBefore = Number(formData.get('pressEndBefore') as string);
    const pressBody = (formData.get('pressBody') as string) || null;
    const recurringEvent = event()
      .recurringEvent as RecurringEventWithOccurrences;
    const occurrence = await trpcClient.mutation('createEvent', {
      type: 'PRACTICE',
      startDateTime,
      endDateTime,
      title,
      location,
      description,
      pressStartBefore,
      pressEndBefore,
      pressBody,
      recurringEventId: recurringEvent.id,
    });
    const occurrences = [...recurringEvent.occurrences, occurrence].sort(
      (a, b) => a.startDateTime.getTime() - b.startDateTime.getTime()
    );
    setEvent({
      ...event(),
      recurringEvent: { ...recurringEvent, occurrences },
    });
  };

  const updateOccurrences = async (formData: FormData) => {
    const title = formData.get('title') as string;
    const location = (formData.get('location') as string) || null;
    const description = (formData.get('description') as string) || null;
    const pressBody = (formData.get('pressBody') as string) || null;
    console.log(pressBody);
    const recurringEvent = await trpcClient.mutation(
      'updateRecurringEventOccurrences',
      {
        id: event().recurringEventId as number,
        title,
        location,
        description,
        pressBody,
      }
    );
    setEvent({
      ...event(),
      title,
      location,
      description,
      recurringEvent,
      pressBody,
    });
  };

  const deleteRecurringEvent = async () => {
    await trpcClient.mutation(
      'deleteRecurringEvent',
      event().recurringEventId as number
    );
    window.location.href = '/tapahtumat#main';
  };

  const updateEvent = async (formData: FormData) => {
    const title = formData.get('title') as string;
    const startDateTime = new Date(formData.get('startDateTime') as string);
    const endDateTimeValue = formData.get('endDateTime') as string;
    const endDateTime = endDateTimeValue ? new Date(endDateTimeValue) : null;
    const location = (formData.get('location') as string) || null;
    const externalUrl = (formData.get('externalUrl') as string) || null;
    const description = (formData.get('description') as string) || null;
    const pressStartBefore = Number(formData.get('pressStartBefore') as string);
    const pressEndBefore = Number(formData.get('pressEndBefore') as string);
    const pressBody = (formData.get('pressBody') as string) || null;
    const updatedEvent = await trpcClient.mutation('updateEvent', {
      ...event(),
      title,
      startDateTime,
      endDateTime,
      location,
      externalUrl,
      description,
      pressStartBefore,
      pressEndBefore,
      pressBody,
    });
    setEvent(updatedEvent);
  };

  const promoteEvent = async () => {
    const promotedEvent = await trpcClient.mutation('promoteEvent', event().id);
    setEvent(promotedEvent);
  };

  const uploadTimetable = async (file: File) => {
    const { data } = await supabaseClient.storage.from('files').upload(
      `timetables/${event().startDateTime.toLocaleDateString(
        'sv'
      )}__${parameterize(event().title, {
        separator: ' ',
        preserveCase: true,
      } as { separator: string })}__Aikataulu`,
      file
    );
    const updatedEvent = await trpcClient.mutation('updateEvent', {
      ...event(),
      timetableFileKey: data?.Key,
    });
    setEvent(updatedEvent);
  };

  const deleteTimetable = async () => {
    const updatedEvent = await trpcClient.mutation('deleteEventTimetable', {
      id: event().id,
      timetableFileKey: event().timetableFileKey as string,
    });
    setEvent(updatedEvent);
  };

  const uploadResults = async (file: File) => {
    const { data } = await supabaseClient.storage.from('files').upload(
      `results/${event().startDateTime.toLocaleDateString(
        'sv'
      )}__${parameterize(event().title, {
        separator: ' ',
        preserveCase: true,
      } as { separator: string })}__Tulokset`,
      file
    );
    const updatedEvent = await trpcClient.mutation('updateEvent', {
      ...event(),
      resultsFileKey: data?.Key,
    });
    setEvent(updatedEvent);
  };

  const deleteResults = async () => {
    const updatedEvent = await trpcClient.mutation('deleteEventResults', {
      id: event().id,
      resultsFileKey: event().resultsFileKey as string,
    });
    setEvent(updatedEvent);
  };

  return {
    event,
    updateEvent,
    promoteEvent,
    deleteEvent,
    uploadTimetable,
    deleteTimetable,
    uploadResults,
    deleteResults,
    createOccurrence,
    deleteOccurrence,
    updateOccurrences,
    deleteRecurringEvent,
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
