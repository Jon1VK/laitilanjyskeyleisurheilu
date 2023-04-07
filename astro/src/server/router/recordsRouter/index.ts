import { createRouter } from "../trpc";
import { createRecord } from "./create";

export const recordsRouter = createRouter({
  create: createRecord,
});
