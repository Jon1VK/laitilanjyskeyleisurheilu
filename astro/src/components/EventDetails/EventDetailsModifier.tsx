import type { Event } from "@prisma/client";
import { parameterize } from "inflected";
import {
  Context,
  createContext,
  createSignal,
  ParentComponent,
  useContext,
} from "solid-js";
import { api } from "~/services/api";
import { supabaseClient } from "~/services/supabaseClient";
import type {
  EventWithOccurrences,
  RecurringEventWithOccurrences,
} from "./types";

const createEventDetailsModifier = (initialEvent: EventWithOccurrences) => {
  const [event, setEvent] = createSignal(initialEvent);

  const deleteEvent = async () => {
    await api.event.delete.mutate({ id: event().id });
    window.location.href = "/tapahtumat#main";
  };

  const deleteOccurrence = async (occurrenceToDelete: Event) => {
    await api.event.delete.mutate({ id: occurrenceToDelete.id });
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
    const startDateTime = new Date(formData.get("startDateTime") as string);
    const endDateTimeValue = formData.get("endDateTime") as string;
    const endDateTime = endDateTimeValue ? new Date(endDateTimeValue) : null;
    const title = formData.get("title") as string;
    const location = (formData.get("location") as string) || null;
    const description = (formData.get("description") as string) || null;
    const pressStartBefore = Number(formData.get("pressStartBefore") as string);
    const pressEndBefore = Number(formData.get("pressEndBefore") as string);
    const pressBody = (formData.get("pressBody") as string) || null;
    const recurringEvent = event()
      .recurringEvent as RecurringEventWithOccurrences;
    const occurrence = await api.event.create.mutate({
      event: {
        type: "PRACTICE",
        startDateTime,
        endDateTime,
        title,
        location,
        description,
        pressBody,
        recurringEventId: recurringEvent.id,
      },
      pressRelease: {
        startBefore: pressStartBefore,
        endBefore: pressEndBefore,
      },
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
    const title = formData.get("title") as string;
    const location = (formData.get("location") as string) || null;
    const description = (formData.get("description") as string) || null;
    const pressBody = (formData.get("pressBody") as string) || null;
    const recurringEvent = await api.recurringEvent.update.mutate({
      id: event().recurringEventId as number,
      occurrencesUpdate: {
        title,
        location,
        description,
        pressBody,
      },
    });
    setEvent({
      ...event(),
      title,
      location,
      description,
      pressBody,
      recurringEvent,
    });
  };

  const deleteRecurringEvent = async () => {
    await api.recurringEvent.delete.mutate({
      id: event().recurringEventId as number,
    });
    window.location.href = "/tapahtumat#main";
  };

  const updateEvent = async (formData: FormData) => {
    const title = formData.get("title") as string;
    const startDateTime = new Date(formData.get("startDateTime") as string);
    const endDateTimeValue = formData.get("endDateTime") as string;
    const endDateTime = endDateTimeValue ? new Date(endDateTimeValue) : null;
    const location = (formData.get("location") as string) || null;
    const externalUrl = (formData.get("externalUrl") as string) || null;
    const description = (formData.get("description") as string) || null;
    const pressStartBefore = Number(formData.get("pressStartBefore") as string);
    const pressEndBefore = Number(formData.get("pressEndBefore") as string);
    const pressBody = (formData.get("pressBody") as string) || null;
    const updatedEvent = await api.event.update.mutate({
      id: event().id,
      eventUpdate: {
        ...event(),
        title,
        startDateTime,
        endDateTime,
        location,
        externalUrl,
        description,
        pressBody,
      },
      pressReleaseUpdate: {
        startBefore: pressStartBefore,
        endBefore: pressEndBefore,
      },
    });
    setEvent({
      ...updatedEvent,
      recurringEvent: event().recurringEvent,
    });
  };

  const promoteEvent = async () => {
    const promotedEvent = await api.event.promote.mutate({ id: event().id });
    setEvent({
      ...promotedEvent,
      recurringEvent: event().recurringEvent,
    });
  };

  const uploadTimetable = async (file: File) => {
    const { data } = await supabaseClient.storage.from("files").upload(
      `timetables/${event().startDateTime.toLocaleDateString(
        "sv"
      )}__${parameterize(event().title, {
        separator: " ",
        preserveCase: true,
      } as { separator: string })}__Aikataulu`,
      file
    );
    const updatedEvent = await api.event.update.mutate({
      id: event().id,
      eventUpdate: {
        ...event(),
        timetableFileKey: data?.Key,
      },
    });
    setEvent({
      ...updatedEvent,
      recurringEvent: event().recurringEvent,
    });
  };

  const deleteTimetable = async () => {
    const updatedEvent = await api.event.deleteTimetable.mutate({
      id: event().id,
    });
    setEvent({
      ...updatedEvent,
      recurringEvent: event().recurringEvent,
    });
  };

  const uploadResults = async (file: File) => {
    const { data } = await supabaseClient.storage.from("files").upload(
      `results/${event().startDateTime.toLocaleDateString(
        "sv"
      )}__${parameterize(event().title, {
        separator: " ",
        preserveCase: true,
      } as { separator: string })}__Tulokset`,
      file
    );
    const updatedEvent = await api.event.update.mutate({
      id: event().id,
      eventUpdate: {
        ...event(),
        resultsFileKey: data?.Key,
      },
    });
    setEvent({
      ...updatedEvent,
      recurringEvent: event().recurringEvent,
    });
  };

  const deleteResults = async () => {
    const updatedEvent = await api.event.deleteResults.mutate({
      id: event().id,
    });
    setEvent({
      ...updatedEvent,
      recurringEvent: event().recurringEvent,
    });
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
