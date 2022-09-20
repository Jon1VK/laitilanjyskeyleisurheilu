import { emailsController } from '@controllers';
import { router } from '@trpc/server';

const emailsRouter = router().mutation(
  'sendContactEmail',
  emailsController.sendContactEmail
);

export default emailsRouter;
