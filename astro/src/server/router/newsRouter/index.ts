import { createRouter } from "../trpc";
import { createNewsArticle } from "./create";

export const newsRouter = createRouter({
  create: createNewsArticle,
});
