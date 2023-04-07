import type { AthleteProfile, User } from "@prisma/client";
import { prisma } from "~/server/db/prisma";

const PrismaUser = Object.assign(prisma.user, {
  async findAllAthletes() {
    return await prisma.user.findMany({
      where: { isAthlete: true },
      include: {
        athleteProfile: true,
      },
      orderBy: { name: "asc" },
    });
  },
});

export interface ExtendedUser extends User {
  image?: string;
  athleteProfile?: AthleteProfile | null;
}

export default PrismaUser;
