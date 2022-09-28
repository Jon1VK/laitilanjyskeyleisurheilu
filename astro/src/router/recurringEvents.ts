import { recurringEventsController } from '@controllers';
import createRouter from '@lib/createRouter';
import { requireAdmin } from '@middlewares';

const recurringEventsRouter = createRouter()
  .middleware(requireAdmin)
  .mutation('createRecurringEvent', recurringEventsController.create)
  .mutation('deleteRecurringEvent', recurringEventsController.delete)
  .mutation(
    'updateRecurringEventOccurrences',
    recurringEventsController.updateOccurrences
  );

export default recurringEventsRouter;
