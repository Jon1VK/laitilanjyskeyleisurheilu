import { recurringEventsController } from '@controllers';
import { router } from '@trpc/server';

const recurringEventsRouter = router().mutation(
  'createRecurringEvent',
  recurringEventsController.create
);

export default recurringEventsRouter;
