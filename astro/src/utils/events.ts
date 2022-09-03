import type { Event } from '@prisma/client';

export const mapEventsByDate = (events: Event[], dates: Date[]) => {
  const eventsByDate = new Map<string, Event[]>();
  dates.forEach((date) => {
    const eventsForDate = events.filter((event) => {
      const startDate = new Date(event.startDateTime.toDateString());
      const endDate = event.endDateTime
        ? new Date(event.endDateTime.toDateString())
        : new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);
      return startDate <= date && date < endDate;
    });
    eventsByDate.set(date.toDateString(), eventsForDate);
  });
  return eventsByDate;
};
