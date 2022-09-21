import prisma from '@lib/prisma';
import type { User } from '@prisma/client';

const PrismaUser = Object.assign(prisma.user, {
  async findAllAthletes() {
    return await prisma.user.findMany({
      where: { isAthlete: true },
      include: {
        athleteProfile: true,
      },
      orderBy: { name: 'asc' },
    });
  },
});

export interface UserWithImage extends User {
  image?: string;
}

export default PrismaUser;
