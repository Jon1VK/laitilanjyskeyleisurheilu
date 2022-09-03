import { router } from '@trpc/server';
import eventsRouter from './eventsRouter';
import trpcTransformer from '@lib/trpcTransformer';

export type AppRouter = typeof appRouter;

export const appRouter = router()
  .transformer(trpcTransformer)
  .merge(eventsRouter);
