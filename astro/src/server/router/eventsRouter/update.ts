import { z } from "zod";
import { adminProtectedProcedure } from "../trpc";

export const updateEvent = adminProtectedProcedure
  .input(
    z.object({
      id: z.number().int(),
      eventUpdate: z.object({
        title: z.string().min(1),
        startDateTime: z.date(),
        endDateTime: z.date().nullable().optional(),
        location: z.string().min(1).nullable().optional(),
        externalUrl: z.string().min(1).nullable().optional(),
        timetableFileKey: z.string().min(1).nullable().optional(),
        resultsFileKey: z.string().min(1).nullable().optional(),
        description: z.string().min(1).nullable().optional(),
        pressBody: z.string().min(1).nullable().optional(),
      }),
      pressReleaseUpdate: z
        .object({
          startBefore: z.number().min(7).max(21).optional(),
          endBefore: z.number().min(1).max(14).optional(),
        })
        .optional(),
    })
  )
  .mutation(async ({ ctx, input: { id, eventUpdate, pressReleaseUpdate } }) => {
    const pressStartDate = pressReleaseUpdate?.startBefore
      ? new Date(
          eventUpdate.startDateTime.getTime() -
            pressReleaseUpdate.startBefore * 24 * 60 * 60 * 1000
        )
      : undefined;
    const pressEndDate = pressReleaseUpdate?.endBefore
      ? new Date(
          eventUpdate.startDateTime.getTime() -
            pressReleaseUpdate?.endBefore * 24 * 60 * 60 * 1000
        )
      : undefined;
    return await ctx.prisma.event.update({
      where: { id },
      data: { ...eventUpdate, pressStartDate, pressEndDate },
    });
  });
