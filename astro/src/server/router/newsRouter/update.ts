import { TRPCError } from "@trpc/server";
import { parameterize } from "inflected";
import { z } from "zod";
import { prisma } from "~/server/db/prisma";
import { supabaseClient } from "~/services/supabaseClient";
import { adminProtectedProcedure } from "../trpc";

export const updateNewsArticle = adminProtectedProcedure
  .input(
    z.object({
      id: z.number().int(),
      update: z.object({
        draft: z.boolean().default(false),
        publishedAt: z.date(),
        author: z.string().min(1),
        cardImage: z.string().min(1).optional().nullable(),
        title: z.string().min(1),
        leadParagraph: z.string().min(1),
        body: z.string().min(1),
      }),
    })
  )
  .mutation(async ({ ctx, input: { id, update } }) => {
    const newsArticle = await prisma.news.findUnique({ where: { id } });
    if (!newsArticle) throw new TRPCError({ code: "CONFLICT" });
    if (update.cardImage !== undefined && newsArticle.cardImage) {
      const path = newsArticle.cardImage.split("public/files/")[1];
      await supabaseClient.storage.from("files").remove([path]);
    }
    const titleSlug = parameterize(update.title);
    const dateSlug = update.publishedAt.toLocaleDateString("sv");
    const slug = `${dateSlug}-${titleSlug}`;
    return await ctx.prisma.news.update({
      where: { id },
      data: { ...update, slug },
    });
  });
