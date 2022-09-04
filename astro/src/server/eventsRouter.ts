import PrismaEvent from '@models/event';
import { router } from '@trpc/server';
import { z } from 'zod';

const eventsRouter = router()
  .query('events', {
    input: z.object({
      year: z.number(),
      month: z.number().min(0).max(11),
    }),
    async resolve({ input }) {
      const { year, month } = input;
      const startDate = new Date(year, month);
      const endDate = new Date(year, month + 1, 0);
      endDate.setDate(endDate.getDate() + 1);
      const events = await PrismaEvent.findAllBetweenStartDateAndEndDate(
        startDate,
        endDate
      );
      return events;
    },
  })
  .mutation('events', {
    input: z.object({
      type: z.enum(['PRACTICE', 'COMPETITION', 'OTHER']),
      startDateTime: z.date(),
      endDateTime: z.date().nullable(),
      title: z.string().min(1),
      location: z.string().min(1).nullable(),
      description: z.string().min(1).nullable(),
    }),
    async resolve({ input: data }) {
      await PrismaEvent.create({ data });
    },
  });

export default eventsRouter;
