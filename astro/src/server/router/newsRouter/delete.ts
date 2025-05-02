import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { adminProtectedProcedure } from "../trpc";

export const deleteNewsArticle = adminProtectedProcedure
  .input(z.object({ id: z.number().int() }))
  .mutation(async ({ ctx, input }) => {
    const newsArticle = await ctx.prisma.news.findUnique({
      where: { id: input.id },
    });
    if (!newsArticle) throw new TRPCError({ code: "CONFLICT" });
    await ctx.prisma.news.delete({ where: { id: newsArticle.id } });
  });
