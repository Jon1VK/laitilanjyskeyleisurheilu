import type { Event } from "@prisma/client";
import { parameterize } from "inflected";
import { z } from "zod";
import { getDatesBetween } from "~/utils/dates";
import { adminProtectedProcedure } from "../trpc";

type Occurrence = Omit<
  Event,
  | "id"
  | "recurringEventId"
  | "resultsFileKey"
  | "timetableFileKey"
  | "externalUrl"
  | "promote"
>;

export const createRecurringEvent = adminProtectedProcedure
  .input(
    z.object({
      event: z.object({
        type: z.enum(["PRACTICE", "COMPETITION", "OTHER"]),
        title: z.string().min(1),
        location: z.string().min(1).nullable(),
        description: z.string().min(1).nullable(),
        pressBody: z.string().min(1).nullable(),
      }),
      recurrence: z.object({
        startDate: z.date(),
        endDate: z.date(),
        weekdays: z.array(z.number().min(0).max(6)).min(1),
        startTime: z.string(),
        endTime: z.string().nullable().optional(),
      }),
      pressRelease: z.object({
        startBefore: z.number().min(7).max(21),
        endBefore: z.number().min(1).max(14),
      }),
    })
  )
  .mutation(async ({ ctx, input: { event, recurrence, pressRelease } }) => {
    const titleSlug = parameterize(event.title);
    const occurrences = getDatesBetween(
      recurrence.startDate,
      recurrence.endDate
    )
      .filter((date) => recurrence.weekdays.includes(date.getDay()))
      .map<Occurrence>((date) => {
        const dateString = date.toLocaleDateString("sv");
        return {
          ...event,
          slug: `${dateString}-${titleSlug}`,
          startDateTime: new Date(`${dateString} ${recurrence.startTime}`),
          endDateTime: recurrence.endTime
            ? new Date(`${dateString} ${recurrence.endTime}`)
            : null,
          pressStartDate: new Date(
            date.getTime() - pressRelease.startBefore * 24 * 60 * 60 * 1000
          ),
          pressEndDate: new Date(
            date.getTime() - pressRelease.endBefore * 24 * 60 * 60 * 1000
          ),
        };
      });
    await ctx.prisma.recurringEvent.create({
      data: {
        startDate: recurrence.startDate,
        endDate: recurrence.endDate,
        weekdays: recurrence.weekdays,
        occurrences: {
          createMany: {
            data: occurrences,
          },
        },
      },
    });
  });
