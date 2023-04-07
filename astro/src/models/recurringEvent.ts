import prisma from "@lib/prisma";
import type { Prisma } from "@prisma/client";

const PrismaRecurringEvent = Object.assign(prisma.recurringEvent, {
  async updateAllOccurrences(id: number, data: Prisma.EventUpdateInput) {
    return prisma.recurringEvent.update({
      where: { id },
      data: {
        occurrences: {
          updateMany: {
            where: {},
            data,
          },
        },
      },
      include: {
        occurrences: true,
      },
    });
  },
});

export default PrismaRecurringEvent;
