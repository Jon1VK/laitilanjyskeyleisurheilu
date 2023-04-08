import { z } from "zod";
import { publicProcedure } from "../trpc";

export const getAllEvents = publicProcedure
  .input(
    z.object({
      startDate: z.date(),
      endDate: z.date(),
    })
  )
  .query(async ({ ctx, input }) => {
    return await ctx.prisma.event.findMany({
      where: {
        startDateTime: { lte: input.endDate },
        OR: [{ endDateTime: { gte: input.startDate } }, { endDateTime: null }],
      },
      orderBy: { startDateTime: "asc" },
    });
  });
