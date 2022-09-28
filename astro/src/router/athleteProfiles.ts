import { athleteProfilesController } from '@controllers';
import createRouter from '@lib/createRouter';
import { requireAthlete } from '@middlewares';

const athleteProfilesRouter = createRouter()
  .middleware(requireAthlete)
  .mutation('updateAthleteProfile', athleteProfilesController.update);

export default athleteProfilesRouter;
