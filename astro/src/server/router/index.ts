import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { athleteProfilesRouter } from "./athleteProfilesRouter";
import { emailsRouter } from "./emailsRouter";
import { eventsRouter } from "./eventsRouter";
import { newsRouter } from "./newsRouter";
import { pressReleasesRouter } from "./pressReleasesRouter.ts";
import { recordsRouter } from "./recordsRouter";
import { recurringEventsRouter } from "./recurringEvent";
import { createRouter } from "./trpc";

export const appRouter = createRouter({
  news: newsRouter,
  event: eventsRouter,
  recurringEvent: recurringEventsRouter,
  record: recordsRouter,
  email: emailsRouter,
  athleteProfile: athleteProfilesRouter,
  pressRelease: pressReleasesRouter,
});

export type AppRouter = typeof appRouter;
export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
