import { eventsController } from '@controllers';
import { router } from '@trpc/server';

const eventsRouter = router()
  .query('getAllEvents', eventsController.getAll)
  .mutation('createEvent', eventsController.create);

export default eventsRouter;
