import { appRouter } from "./router";
import { createContext } from "./trpc";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

export const requestHandler = ({ request }: { request: Request }) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req: request,
    router: appRouter,
    createContext,
  });
