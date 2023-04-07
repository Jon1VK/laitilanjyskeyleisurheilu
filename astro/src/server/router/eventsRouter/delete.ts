import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { supabaseClient } from "~/services/supabaseClient";
import { adminProtectedProcedure } from "../trpc";

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
    if (filesToDelete.length) {
      await supabaseClient.storage.from("files").remove(filesToDelete);
    }
    await ctx.prisma.event.delete({ where: { id: event.id } });
  });
