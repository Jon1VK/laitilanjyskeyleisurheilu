import { recordsController } from '@controllers';
import { router } from '@trpc/server';

const recordsRouter = router().mutation(
  'createRecord',
  recordsController.create
);

export default recordsRouter;
