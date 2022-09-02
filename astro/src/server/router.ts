import { router } from '@trpc/server';
import trpcTransformer from '@lib/trpcTransformer';

export type AppRouter = typeof appRouter;

export const appRouter = router().transformer(trpcTransformer);
