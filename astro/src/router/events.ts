import { eventsController } from '@controllers';
import { router } from '@trpc/server';

const eventsRouter = router()
  .query('getAllEvents', eventsController.getAll)
  .mutation('createEvent', eventsController.create)
  .mutation('deleteEvent', eventsController.delete);

export default eventsRouter;
