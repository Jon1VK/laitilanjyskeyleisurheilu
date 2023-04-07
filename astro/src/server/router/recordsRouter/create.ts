import { z } from "zod";
import { EVENTS, LEAGUES } from "~/utils/records";
import { publicProcedure } from "../trpc";

export const createRecord = publicProcedure
  .input(
    z.object({
      league: z.enum(LEAGUES),
      athlete: z.string().min(1),
      event: z.enum(EVENTS),
      result: z.string().min(1),
      achievedAt: z.date(),
      location: z.string().min(1),
    })
  )
  .mutation(async ({ ctx, input }) => {
    await ctx.prisma.record.create({ data: input });
  });
