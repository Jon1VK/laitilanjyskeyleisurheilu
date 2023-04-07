import prisma from "@lib/prisma";
import type { Prisma } from "@prisma/client";

const PrismaAthleteProfile = Object.assign(prisma.athleteProfile, {
  async findUniqueWithAthlete(slug: string) {
    return await prisma.athleteProfile.findUnique({
      where: { slug },
      include: { athlete: true },
    });
  },
  async updateAndIncludeAthlete(
    id: number,
    data: Prisma.AthleteProfileUpdateInput
  ) {
    return await prisma.athleteProfile.update({
      where: { id },
      data,
      include: { athlete: true },
    });
  },
});

export default PrismaAthleteProfile;
