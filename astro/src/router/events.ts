import { eventsController } from '@controllers';
import createRouter from '@lib/createRouter';
import { requireLoggedIn } from 'src/middlewares';

const eventsRouter = createRouter()
  .query('getAllEvents', eventsController.getAll)
  .middleware(requireLoggedIn)
  .mutation('createEvent', eventsController.create)
  .mutation('updateEvent', eventsController.update)
  .mutation('deleteEvent', eventsController.delete)
  .mutation('deleteEventTimetable', eventsController.deleteTimetable)
  .mutation('deleteEventResults', eventsController.deleteResults);

export default eventsRouter;
