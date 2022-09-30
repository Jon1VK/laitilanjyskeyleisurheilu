import { pressReleasesController } from '@controllers';
import createRouter from '@lib/createRouter';
import { requireAdmin } from '@middlewares';

const pressReleasesRouter = createRouter()
  .middleware(requireAdmin)
  .mutation('updatePressRelease', pressReleasesController.update)
  .mutation('deletePressRelease', pressReleasesController.delete);

export default pressReleasesRouter;
