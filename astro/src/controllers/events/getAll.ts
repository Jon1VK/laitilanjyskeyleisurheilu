import { PrismaEvent } from '@models';
import { z } from 'zod';

const input = z.object({
  startDate: z.date(),
  endDate: z.date(),
});

type Input = z.infer<typeof input>;

const resolve = async ({ input: { startDate, endDate } }: { input: Input }) => {
  const events = await PrismaEvent.findAllBetweenStartDateAndEndDate(
    startDate,
    endDate
  );
  return events;
};

const getAllEvents = { input, resolve };

export default getAllEvents;
