import prisma from '@lib/prisma';

const PrismaAthleteProfile = Object.assign(prisma.athleteProfile, {
  async findUniqueWithAthlete(slug: string) {
    return await prisma.athleteProfile.findUnique({
      where: { slug },
      include: { athlete: true },
    });
  },
});

export default PrismaAthleteProfile;
