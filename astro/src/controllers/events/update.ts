import { PrismaEvent } from '@models';
import { z } from 'zod';

const input = z.object({
  id: z.number().int(),
  startDateTime: z.date(),
  endDateTime: z.date().nullable(),
  location: z.string().min(1).nullable(),
  timetableFileKey: z.string().min(1).nullable().optional(),
  resultsFileKey: z.string().min(1).nullable().optional(),
  description: z.string().min(1).nullable(),
});

type Input = z.infer<typeof input>;

const resolve = async ({ input }: { input: Input }) => {
  const { id, ...data } = input;
  const updatedEvent = await PrismaEvent.updateAndIncludeOccurrences(id, data);
  return updatedEvent;
};

const updateEvent = { input, resolve };

export default updateEvent;
