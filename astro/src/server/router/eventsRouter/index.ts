import { createRouter } from "../trpc";
import { createEvent } from "./create";
import { deleteEvent } from "./delete";
import { deleteEventResults } from "./deleteResults";
import { deleteEventTimetable } from "./deleteTimetable";
import { getAllEvents } from "./getAll";
import { promoteEvent } from "./promote";
import { updateEvent } from "./update";

export const eventsRouter = createRouter({
  getAll: getAllEvents,
  create: createEvent,
  update: updateEvent,
  promote: promoteEvent,
  delete: deleteEvent,
  deleteResults: deleteEventResults,
  deleteTimetable: deleteEventTimetable,
});
