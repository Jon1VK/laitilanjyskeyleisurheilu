import type { Session } from "./auth-options";
import { getUser } from "@astro-auth/core";

type AstroGlobal = typeof getUser extends (args: { client: infer A }) => unknown
  ? A
  : never;

export const getSession = (args: {
  req?: Request;
  astroGlobal?: AstroGlobal;
}) => {
  return getUser({ client: args.astroGlobal, server: args.req }) as
    | Session
    | null
    | undefined;
};
