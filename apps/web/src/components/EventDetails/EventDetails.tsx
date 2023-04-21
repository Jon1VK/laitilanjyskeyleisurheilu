import EventDetailsDescription from "./EventDetailsDescription";
import EventDetailsFiles from "./EventDetailsFiles";
import EventDetailsHeader from "./EventDetailsHeader";
import EventDetailsModifierProvider from "./EventDetailsModifier";
import EventDetailsOccurrences from "./EventDetailsOccurrences";
import type { Prisma } from "@laitjy/db";

const EventDetails = (props: {
  event: Prisma.EventGetPayload<{
    include: {
      recurringEvent: {
        include: {
          occurrences: true;
        };
      };
    };
  }>;
}) => (
  <EventDetailsModifierProvider initialEvent={props.event}>
    <article class="relative mx-auto max-w-prose px-6 text-lg sm:px-6 lg:px-8">
      <EventDetailsHeader />
      <EventDetailsFiles />
      <EventDetailsDescription />
      <EventDetailsOccurrences />
    </article>
  </EventDetailsModifierProvider>
);

export default EventDetails;
