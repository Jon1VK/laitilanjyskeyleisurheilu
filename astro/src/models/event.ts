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
      orderBy: { startDateTime: 'asc' },
    });
  },
  async findUniqueWithOccurrences(slug: string) {
    return await prisma.event.findUnique({
      where: { slug },
      include: {
        RecurringEvent: {
          include: {
            occurrences: {
              where: {
                slug: {
                  not: slug,
                },
              },
              orderBy: { startDateTime: 'asc' },
            },
          },
        },
      },
    });
  },
  async updateAndIncludeOccurrences(id: number, data: Record<string, unknown>) {
    const updatedEvent = await prisma.event.update({
      where: { id },
      data,
      include: {
        RecurringEvent: {
          include: {
            occurrences: {
              where: {
                id: {
                  not: id,
                },
              },
              orderBy: { startDateTime: 'asc' },
            },
          },
        },
      },
    });
    return updatedEvent;
  },
});

export default PrismaEvent;
