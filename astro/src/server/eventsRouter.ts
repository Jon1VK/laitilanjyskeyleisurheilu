import PrismaEvent from '@models/event';
import { router } from '@trpc/server';
import { z } from 'zod';

const eventsRouter = router().query('events', {
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
});

export default eventsRouter;
