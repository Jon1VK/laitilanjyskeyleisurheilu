import { adminProtectedProcedure } from "../../trpc";
import { deleteFilesFromStorage } from "@laitjy/supabase";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const deleteEvent = adminProtectedProcedure
  .input(z.object({ id: z.number().int() }))
  .mutation(async ({ ctx, input }) => {
    const event = await ctx.prisma.event.findUnique({
      where: { id: input.id },
    });
    if (!event) throw new TRPCError({ code: "CONFLICT" });
    const filesToDelete: string[] = [];
    const { timetableFileKey, resultsFileKey } = event;
    if (timetableFileKey) filesToDelete.push(timetableFileKey.slice(6));
    if (resultsFileKey) filesToDelete.push(resultsFileKey.slice(6));
    if (filesToDelete.length) await deleteFilesFromStorage(filesToDelete);
    await ctx.prisma.event.delete({ where: { id: event.id } });
  });
