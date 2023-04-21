import { transformer } from "./transformer";
import { getSession } from "@laitjy/auth";
import { prisma } from "@laitjy/db";
import { TRPCError, type inferAsyncReturnType, initTRPC } from "@trpc/server";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

export const createContext = ({ req }: FetchCreateContextFnOptions) => {
  const session = getSession({ req });
  return { user: session?.user, prisma };
};

export type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create({
  transformer,
  errorFormatter({ shape }) {
    return shape;
  },
});

export const createRouter = t.router;
export const mergeRouters = t.mergeRouters;
export const createMiddleware = t.middleware;

export const publicProcedure = t.procedure;

export const protectedProcedure = publicProcedure.use(
  createMiddleware(({ ctx, next }) => {
    if (!ctx.user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next({
      ctx: {
        ...ctx,
        // infers that `user` is non-nullable to downstream resolvers
        user: ctx.user,
      },
    });
  })
);

export const athleteProtectedProcedure = protectedProcedure.use(
  createMiddleware(({ ctx, next }) => {
    if (!ctx.user?.isAthlete) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next({
      ctx: {
        ...ctx,
        // infers that `user` is non-nullable to downstream resolvers
        user: ctx.user,
      },
    });
  })
);

export const adminProtectedProcedure = protectedProcedure.use(
  createMiddleware(({ ctx, next }) => {
    if (!ctx.user?.isAdmin) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next({
      ctx: {
        ...ctx,
        // infers that `user` is non-nullable to downstream resolvers
        user: ctx.user,
      },
    });
  })
);
