import type { AthleteProfile, User } from "@prisma/client";

export type AthleteProfileWithAthlete = AthleteProfile & {
  athlete: User;
};
