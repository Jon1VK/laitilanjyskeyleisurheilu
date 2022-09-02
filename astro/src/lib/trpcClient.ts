import { createTRPCClient } from '@trpc/client';
import type { AppRouter } from '@server/router';
import trpcTransformer from './trpcTransformer';

const trpc = createTRPCClient<AppRouter>({
  url: `http://localhost:3000/api/trpc`,
  transformer: trpcTransformer,
});

export default trpc;
