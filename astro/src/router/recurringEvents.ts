import { recurringEventsController } from '@controllers';
import createRouter from '@lib/createRouter';
import { requireLoggedIn } from 'src/middlewares';

const recurringEventsRouter = createRouter()
  .middleware(requireLoggedIn)
  .mutation('createRecurringEvent', recurringEventsController.create)
  .mutation('deleteRecurringEvent', recurringEventsController.delete);

export default recurringEventsRouter;
