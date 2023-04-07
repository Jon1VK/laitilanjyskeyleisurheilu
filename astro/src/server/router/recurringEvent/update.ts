import { z } from "zod";
import { adminProtectedProcedure } from "../trpc";

export const updateRecurringEvent = adminProtectedProcedure
  .input(
    z.object({
      id: z.number().int(),
      occurrencesUpdate: z.object({
        title: z.string().min(1),
        location: z.string().min(1).nullable().optional(),
        description: z.string().min(1).nullable().optional(),
        pressBody: z.string().min(1).nullable().optional(),
      }),
    })
  )
  .mutation(async ({ ctx, input: { id, occurrencesUpdate } }) => {
    return await ctx.prisma.recurringEvent.update({
      where: { id },
      data: {
        occurrences: {
          updateMany: {
            where: {},
            data: occurrencesUpdate,
          },
        },
      },
      include: {
        occurrences: true,
      },
    });
  });
