import { createRouter } from "../trpc";
import { athleteProfilesRouter } from "./athleteProfilesRouter";
import { emailsRouter } from "./emailsRouter";
import { eventsRouter } from "./eventsRouter";
import { newsRouter } from "./newsRouter";
import { pressReleasesRouter } from "./pressReleasesRouter.ts";
import { recordsRouter } from "./recordsRouter";
import { recurringEventsRouter } from "./recurringEvent";

export const appRouter = createRouter({
  news: newsRouter,
  event: eventsRouter,
  recurringEvent: recurringEventsRouter,
  record: recordsRouter,
  email: emailsRouter,
  athleteProfile: athleteProfilesRouter,
  pressRelease: pressReleasesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
