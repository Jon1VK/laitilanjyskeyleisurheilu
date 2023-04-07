import { eventsController } from "@controllers";
import createRouter from "@lib/createRouter";
import { requireAdmin } from "@middlewares";

const eventsRouter = createRouter()
  .query("getAllEvents", eventsController.getAll)
  .middleware(requireAdmin)
  .mutation("createEvent", eventsController.create)
  .mutation("updateEvent", eventsController.update)
  .mutation("promoteEvent", eventsController.promote)
  .mutation("deleteEvent", eventsController.delete)
  .mutation("deleteEventTimetable", eventsController.deleteTimetable)
  .mutation("deleteEventResults", eventsController.deleteResults);

export default eventsRouter;
