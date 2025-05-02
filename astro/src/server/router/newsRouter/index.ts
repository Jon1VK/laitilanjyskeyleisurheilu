import { createRouter } from "../trpc";
import { createNewsArticle } from "./create";
import { deleteNewsArticle } from "./delete";
import { updateNewsArticle } from "./update";

export const newsRouter = createRouter({
  create: createNewsArticle,
  update: updateNewsArticle,
  delete: deleteNewsArticle,
});
