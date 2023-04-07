import { z } from "zod";
import { adminProtectedProcedure } from "../trpc";

export const updatePressRelease = adminProtectedProcedure
  .input(
    z.object({
      id: z.number().int(),
      update: z.object({
        sendDate: z.date(),
        newsBody: z.string().min(1),
        whatsappBody: z.string().min(1),
      }),
    })
  )
  .mutation(async ({ ctx, input: { id, update } }) => {
    return await ctx.prisma.pressRelease.update({
      where: { id },
      data: update,
    });
  });
