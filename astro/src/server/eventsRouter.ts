import PrismaEvent from '@models/event';
import { router } from '@trpc/server';
import { getCalendarEndDate, getCalendarStartDate } from '@utils/dates';
import { z } from 'zod';

const eventsRouter = router().query('events', {
  input: z.object({
    year: z.number(),
    month: z.number().min(0).max(11),
  }),
  async resolve({ input }) {
    const { year, month } = input;
    const startDate = getCalendarStartDate(year, month);
    const endDate = getCalendarEndDate(year, month);
    endDate.setDate(endDate.getDate() + 1);
    const events = await PrismaEvent.findAllBetweenStartDateAndEndDate(
      startDate,
      endDate
    );
    return events;
  },
});

export default eventsRouter;
