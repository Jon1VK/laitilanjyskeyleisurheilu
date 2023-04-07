import type { Context } from "@lib/createContext";
import { TRPCError } from "@trpc/server";
import type { MiddlewareFunction } from "@trpc/server/dist/declarations/src/internals/middlewares";

const requireAdmin: MiddlewareFunction<Context, Context, unknown> = ({
  ctx,
  next,
}) => {
  if (!ctx.user?.isAthlete) throw new TRPCError({ code: "UNAUTHORIZED" });
  return next();
};

export default requireAdmin;
