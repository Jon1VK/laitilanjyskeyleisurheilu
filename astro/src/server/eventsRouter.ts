import PrismaEvent from '@models/event';
import { router } from '@trpc/server';
import { parameterize } from 'inflected';
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
  .query('event', {
    input: z.string(),
    async resolve({ input: slug }) {
      const event = await PrismaEvent.findUniqueOrThrow({ where: { slug } });
      return event;
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
    async resolve({ input }) {
      const dateSlug = input.startDateTime.toLocaleDateString('sv');
      const titleSlug = parameterize(input.title);
      const slug = `${dateSlug}-${titleSlug}`;
      await PrismaEvent.create({ data: { ...input, slug } });
    },
  });

export default eventsRouter;
