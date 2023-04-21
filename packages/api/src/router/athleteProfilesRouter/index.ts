import { createRouter } from "../../trpc";
import { updateAthleteProfile } from "./update";

export const athleteProfilesRouter = createRouter({
  update: updateAthleteProfile,
});
