import { adminProtectedProcedure } from "../../trpc";
import { z } from "zod";

export const deleteRecurringEvent = adminProtectedProcedure
  .input(z.object({ id: z.number().int() }))
  .mutation(async ({ ctx, input }) => {
    await ctx.prisma.recurringEvent.delete({ where: { id: input.id } });
  });
