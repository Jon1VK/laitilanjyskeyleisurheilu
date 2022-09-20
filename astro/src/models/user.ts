import prisma from '@lib/prisma';
import type { User } from '@prisma/client';

const PrismaUser = Object.assign(prisma.user, {});

export interface UserWithImage extends User {
  image?: string;
}

export default PrismaUser;
