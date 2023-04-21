import type { AppRouter } from "./router";
import { transformer } from "./transformer";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";

export const api = createTRPCProxyClient<AppRouter>({
  transformer,
  links: [
    httpBatchLink({
      url: `${import.meta.env.PUBLIC_BASE_URL}/api/trpc`,
    }),
  ],
});
