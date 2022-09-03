import prisma from '@lib/prisma';

const PrismaEvent = Object.assign(prisma.event, {
  async findAllBetweenStartDateAndEndDate(startDate: Date, endDate: Date) {
    const betweenFilter = { gte: startDate, lte: endDate };
    return await prisma.event.findMany({
      where: {
        OR: [
          { startDateTime: betweenFilter },
          { endDateTime: betweenFilter },
          {
            startDateTime: { lte: startDate },
            endDateTime: { gte: endDate },
          },
        ],
      },
    });
  },
});

export default PrismaEvent;
