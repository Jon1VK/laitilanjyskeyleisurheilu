import { PrismaNews } from "@models";
import { parameterize } from "inflected";
import { z } from "zod";

const input = z.object({
  draft: z.boolean().default(false),
  publishedAt: z.date(),
  author: z.string().min(1),
  cardImage: z.string().min(1).optional().nullable(),
  title: z.string().min(1),
  leadParagraph: z.string().min(1),
  body: z.string().min(1),
});

type Input = z.infer<typeof input>;

const resolve = async ({ input }: { input: Input }) => {
  const titleSlug = parameterize(input.title);
  const dateSlug = input.publishedAt.toLocaleDateString("sv");
  const slug = `${dateSlug}-${titleSlug}`;
  return await PrismaNews.create({ data: { ...input, slug } });
};

const createNews = { input, resolve };

export default createNews;
