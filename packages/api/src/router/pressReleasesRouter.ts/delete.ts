import { adminProtectedProcedure } from "../../trpc";
import { z } from "zod";

export const deletePressRelease = adminProtectedProcedure
  .input(z.object({ id: z.number().int() }))
  .mutation(async ({ ctx, input }) => {
    await ctx.prisma.pressRelease.delete({ where: { id: input.id } });
  });
