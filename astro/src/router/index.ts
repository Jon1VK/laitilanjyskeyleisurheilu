import createRouter from '@lib/createRouter';
import trpcTransformer from '@lib/trpcTransformer';
import athleteProfilesRouter from './athleteProfiles';
import emailsRouter from './emails';
import eventsRouter from './events';
import newsRouter from './news';
import pressReleasesRouter from './pressReleases';
import recordsRouter from './records';
import recurringEventsRouter from './recurringEvents';

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
