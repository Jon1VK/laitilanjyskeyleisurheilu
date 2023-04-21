import { adminProtectedProcedure } from "../../trpc";
import { parameterize } from "inflected";
import { z } from "zod";

export const createNewsArticle = adminProtectedProcedure
  .input(
    z.object({
      draft: z.boolean().default(false),
      publishedAt: z.date(),
      author: z.string().min(1),
      cardImage: z.string().min(1).optional().nullable(),
      title: z.string().min(1),
      leadParagraph: z.string().min(1),
      body: z.string().min(1),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const titleSlug = parameterize(input.title);
    const dateSlug = input.publishedAt.toLocaleDateString("sv");
    const slug = `${dateSlug}-${titleSlug}`;
    return await ctx.prisma.news.create({ data: { ...input, slug } });
  });
