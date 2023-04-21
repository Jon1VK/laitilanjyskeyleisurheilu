import { createRouter } from "../../trpc";
import { createRecurringEvent } from "./create";
import { deleteRecurringEvent } from "./delete";
import { updateRecurringEvent } from "./update";

export const recurringEventsRouter = createRouter({
  create: createRecurringEvent,
  update: updateRecurringEvent,
  delete: deleteRecurringEvent,
});
