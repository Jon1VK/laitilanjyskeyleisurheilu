import { parameterize } from "inflected";
import { z } from "zod";
import { adminProtectedProcedure } from "../trpc";

export const createEvent = adminProtectedProcedure
  .input(
    z.object({
      event: z.object({
        type: z.enum(["PRACTICE", "COMPETITION", "OTHER"]),
        title: z.string().min(1),
        startDateTime: z.date(),
        endDateTime: z.date().nullable().optional(),
        location: z.string().min(1).nullable().optional(),
        description: z.string().min(1).nullable().optional(),
        externalUrl: z.string().min(1).nullable().optional(),
        pressBody: z.string().min(1).nullable().optional(),
        recurringEventId: z.number().optional(),
      }),
      pressRelease: z.object({
        startBefore: z.number().min(7).max(21),
        endBefore: z.number().min(1).max(14),
      }),
    })
  )
  .mutation(async ({ ctx, input: { event, pressRelease } }) => {
    const titleSlug = parameterize(event.title);
    const dateSlug = event.startDateTime.toLocaleDateString("sv");
    const slug = `${dateSlug}-${titleSlug}`;
    const pressStartDate = new Date(
      event.startDateTime.getTime() -
        pressRelease.startBefore * 24 * 60 * 60 * 1000
    );
    const pressEndDate = new Date(
      event.startDateTime.getTime() -
        pressRelease.endBefore * 24 * 60 * 60 * 1000
    );
    return await ctx.prisma.event.create({
      data: {
        ...event,
        slug,
        pressEndDate,
        pressStartDate,
      },
    });
  });
