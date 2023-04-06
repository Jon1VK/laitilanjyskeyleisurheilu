import type { AppRouter } from '@router';
import { createTRPCClient } from '@trpc/client';
import trpcTransformer from './trpcTransformer';

const trpcClient = createTRPCClient<AppRouter>({
  url: `${import.meta.env.PUBLIC_BASE_URL}/api/trpc`,
  transformer: trpcTransformer,
});

export default trpcClient;
