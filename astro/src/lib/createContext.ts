import { getUser } from "@astro-auth/core";
import type { inferAsyncReturnType } from "@trpc/server";
import type { JwtPayload } from "jsonwebtoken";

const createContext = (request: Request) => {
  // eslint-disable-next-line @typescript-eslint/require-await
  return async () => {
    const JwtPayload = getUser({ server: request }) as
      | JwtPayload
      | null
      | undefined;
    return {
      user: JwtPayload?.user,
    };
  };
};

export type Context = inferAsyncReturnType<ReturnType<typeof createContext>>;

export default createContext;
