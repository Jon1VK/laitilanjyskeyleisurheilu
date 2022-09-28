import { newsController } from '@controllers';
import createRouter from '@lib/createRouter';
import { requireAdmin } from '@middlewares';

const newsRouter = createRouter()
  .middleware(requireAdmin)
  .mutation('createNews', newsController.create);

export default newsRouter;
