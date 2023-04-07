import type { AppRouter } from "@server/router";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { transformer } from "../utils/trpcTransformer";

export const api = createTRPCProxyClient<AppRouter>({
  transformer,
  links: [
    httpBatchLink({
      url: `${import.meta.env.PUBLIC_BASE_URL}/api/trpc`,
    }),
  ],
});
