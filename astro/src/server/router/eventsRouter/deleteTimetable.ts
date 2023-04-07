import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { supabaseClient } from "~/services/supabaseClient";
import { adminProtectedProcedure } from "../trpc";

export const deleteEventTimetable = adminProtectedProcedure
  .input(z.object({ id: z.number().int() }))
  .mutation(async ({ ctx, input }) => {
    const event = await ctx.prisma.event.findUnique({
      where: { id: input.id },
    });
    if (!event?.timetableFileKey) throw new TRPCError({ code: "CONFLICT" });
    await supabaseClient.storage
      .from("files")
      .remove([event.timetableFileKey.slice(6)]);
    return await ctx.prisma.event.update({
      where: { id: event.id },
      data: { timetableFileKey: null },
    });
  });
