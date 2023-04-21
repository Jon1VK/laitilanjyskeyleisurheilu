import { adminProtectedProcedure } from "../../trpc";
import { z } from "zod";

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
