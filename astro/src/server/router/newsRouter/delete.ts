import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { supabaseClient } from "~/services/supabaseClient";
import { adminProtectedProcedure } from "../trpc";

export const deleteNewsArticle = adminProtectedProcedure
  .input(z.object({ id: z.number().int() }))
  .mutation(async ({ ctx, input }) => {
    const newsArticle = await ctx.prisma.news.findUnique({
      where: { id: input.id },
    });
    if (!newsArticle) throw new TRPCError({ code: "CONFLICT" });
    if (newsArticle.cardImage) {
      const path = newsArticle.cardImage.split("public/files/")[1];
      await supabaseClient.storage.from("files").remove([path]);
    }
    await ctx.prisma.news.delete({ where: { id: newsArticle.id } });
  });
