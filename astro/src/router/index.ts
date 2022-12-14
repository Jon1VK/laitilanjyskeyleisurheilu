import eventsRouter from './events';
import trpcTransformer from '@lib/trpcTransformer';
import recurringEventsRouter from './recurringEvents';
import recordsRouter from './records';
import emailsRouter from './emails';
import createRouter from '@lib/createRouter';
import athleteProfilesRouter from './athleteProfiles';
import newsRouter from './news';
import pressReleasesRouter from './pressReleases';

export type AppRouter = typeof appRouter;

export const appRouter = createRouter()
  .transformer(trpcTransformer)
  .merge(eventsRouter)
  .merge(recurringEventsRouter)
  .merge(recordsRouter)
  .merge(emailsRouter)
  .merge(athleteProfilesRouter)
  .merge(newsRouter)
  .merge(pressReleasesRouter);
