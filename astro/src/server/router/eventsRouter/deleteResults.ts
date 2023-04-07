import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { supabaseClient } from "~/services/supabaseClient";
import { adminProtectedProcedure } from "../trpc";

export const deleteEventResults = adminProtectedProcedure
  .input(z.object({ id: z.number().int() }))
  .mutation(async ({ ctx, input }) => {
    const event = await ctx.prisma.event.findUnique({
      where: { id: input.id },
    });
    if (!event?.resultsFileKey) throw new TRPCError({ code: "CONFLICT" });
    await supabaseClient.storage
      .from("files")
      .remove([event.resultsFileKey.slice(6)]);
    return await ctx.prisma.event.update({
      where: { id: event.id },
      data: { resultsFileKey: null },
    });
  });
