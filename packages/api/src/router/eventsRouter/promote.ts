import { adminProtectedProcedure } from "../../trpc";
import { z } from "zod";

export const promoteEvent = adminProtectedProcedure
  .input(z.object({ id: z.number().int() }))
  .mutation(async ({ ctx, input }) => {
    await ctx.prisma.event.updateMany({
      where: { promote: true },
      data: { promote: false },
    });
    return await ctx.prisma.event.update({
      where: { id: input.id },
      data: { promote: true },
    });
  });
