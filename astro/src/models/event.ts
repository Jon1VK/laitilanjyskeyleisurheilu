import prisma from "@lib/prisma";
import type { Prisma } from "@prisma/client";

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
      orderBy: { startDateTime: "asc" },
    });
  },
  async findUniqueWithOccurrences(slug: string) {
    return await prisma.event.findUnique({
      where: { slug },
      include: {
        recurringEvent: {
          include: {
            occurrences: {
              where: {
                slug: {
                  not: slug,
                },
              },
              orderBy: { startDateTime: "asc" },
            },
          },
        },
      },
    });
  },
  async updateAndIncludeOccurrences(id: number, data: Prisma.EventUpdateInput) {
    return await prisma.event.update({
      where: { id },
      data,
      include: {
        recurringEvent: {
          include: {
            occurrences: {
              where: {
                id: {
                  not: id,
                },
              },
              orderBy: { startDateTime: "asc" },
            },
          },
        },
      },
    });
  },
  async findPromoted() {
    return await prisma.event.findFirst({ where: { promote: true } });
  },
  async findByPressSendDate(pressSendDate: Date) {
    return await prisma.event.findMany({
      where: {
        pressStartDate: { lte: pressSendDate },
        pressEndDate: { gte: pressSendDate },
      },
      orderBy: { startDateTime: "asc" },
    });
  },
});

export default PrismaEvent;
