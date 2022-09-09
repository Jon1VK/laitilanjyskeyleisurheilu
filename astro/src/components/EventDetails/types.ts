import type { Event, RecurringEvent } from '@prisma/client';

export type RecurringEventWithOccurrences = RecurringEvent & {
  occurrences: Event[];
};

export type EventWithOccurrences = Event & {
  RecurringEvent: RecurringEventWithOccurrences | null;
};
