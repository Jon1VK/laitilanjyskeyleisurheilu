import type { Context } from '@lib/createContext';
import { TRPCError } from '@trpc/server';
import type { MiddlewareFunction } from '@trpc/server/dist/declarations/src/internals/middlewares';

const requireLoggedIn: MiddlewareFunction<Context, Context, unknown> = ({
  ctx,
  next,
}) => {
  if (!ctx.user) throw new TRPCError({ code: 'UNAUTHORIZED' });
  return next();
};

export default requireLoggedIn;
