import { api } from "@laitjy/api";
import type { Prisma, Event } from "@laitjy/db";
import {
  uploadResultsToStorage,
  uploadTimetableToStorage,
} from "@laitjy/supabase";
import type { Context, ParentComponent } from "solid-js";
import { createContext, createSignal, useContext } from "solid-js";

const createEventDetailsModifier = (
  initialEvent: Prisma.EventGetPayload<{
    include: {
      recurringEvent: {
        include: {
          occurrences: true;
        };
      };
    };
  }>
) => {
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
    const recurringEvent = event().recurringEvent;
    if (!recurringEvent) return;
    const startDateTime = new Date(formData.get("startDateTime") as string);
    const endDateTimeValue = formData.get("endDateTime") as string;
    const endDateTime = endDateTimeValue ? new Date(endDateTimeValue) : null;
    const title = formData.get("title") as string;
    const location = (formData.get("location") as string) || null;
    const description = (formData.get("description") as string) || null;
    const pressStartBefore = Number(formData.get("pressStartBefore") as string);
    const pressEndBefore = Number(formData.get("pressEndBefore") as string);
    const pressBody = (formData.get("pressBody") as string) || null;
    const occurrence = await api.event.create.mutate({
      event: {
        type: "PRACTICE",
        startDateTime,
        endDateTime,
        title,
        location,
        description,
        pressBody,
        recurringEventId: recurringEvent?.id,
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
    const timetableFileKey = await uploadTimetableToStorage({
      file,
      title: event().title,
      date: event().startDateTime,
    });
    const updatedEvent = await api.event.update.mutate({
      id: event().id,
      eventUpdate: {
        ...event(),
        timetableFileKey,
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
    const resultsFileKey = await uploadResultsToStorage({
      file,
      title: event().title,
      date: event().startDateTime,
    });
    const updatedEvent = await api.event.update.mutate({
      id: event().id,
      eventUpdate: {
        ...event(),
        resultsFileKey,
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
  initialEvent: Prisma.EventGetPayload<{
    include: {
      recurringEvent: {
        include: {
          occurrences: true;
        };
      };
    };
  }>;
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
