import { adminProtectedProcedure } from "../../trpc";
import { deleteFilesFromStorage } from "@laitjy/supabase";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const deleteEventTimetable = adminProtectedProcedure
  .input(z.object({ id: z.number().int() }))
  .mutation(async ({ ctx, input }) => {
    const event = await ctx.prisma.event.findUnique({
      where: { id: input.id },
    });
    if (!event?.timetableFileKey) throw new TRPCError({ code: "CONFLICT" });
    await deleteFilesFromStorage([event.timetableFileKey.slice(6)]);
    return await ctx.prisma.event.update({
      where: { id: event.id },
      data: { timetableFileKey: null },
    });
  });
