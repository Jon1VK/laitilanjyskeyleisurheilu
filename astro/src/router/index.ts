import { router } from '@trpc/server';
import eventsRouter from './events';
import trpcTransformer from '@lib/trpcTransformer';
import recurringEventsRouter from './recurringEvents';
import recordsRouter from './records';
import emailsRouter from './emails';

export type AppRouter = typeof appRouter;

export const appRouter = router()
  .transformer(trpcTransformer)
  .merge(eventsRouter)
  .merge(recurringEventsRouter)
  .merge(recordsRouter)
  .merge(emailsRouter);
