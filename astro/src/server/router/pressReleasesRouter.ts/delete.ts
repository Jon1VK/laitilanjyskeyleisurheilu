import { z } from "zod";
import { adminProtectedProcedure } from "../trpc";

export const deletePressRelease = adminProtectedProcedure
  .input(z.object({ id: z.number().int() }))
  .mutation(async ({ ctx, input }) => {
    await ctx.prisma.pressRelease.delete({ where: { id: input.id } });
  });
