import { PrismaEvent } from '@models';
import { z } from 'zod';

const input = z.object({
  id: z.number().int(),
  title: z.string().min(1),
  startDateTime: z.date(),
  endDateTime: z.date().nullable().optional(),
  location: z.string().min(1).nullable().optional(),
  externalUrl: z.string().min(1).nullable().optional(),
  timetableFileKey: z.string().min(1).nullable().optional(),
  resultsFileKey: z.string().min(1).nullable().optional(),
  description: z.string().min(1).nullable().optional(),
  pressStartBefore: z.number().min(7).max(21).optional(),
  pressEndBefore: z.number().min(1).max(14).optional(),
  pressBody: z.string().min(1).nullable().optional(),
});

type Input = z.infer<typeof input>;

const resolve = async ({ input }: { input: Input }) => {
  const { id, pressStartBefore, pressEndBefore, ...data } = input;
  const pressStartDate = pressStartBefore
    ? new Date(
        input.startDateTime.getTime() - pressStartBefore * 24 * 60 * 60 * 1000
      )
    : undefined;
  const pressEndDate = pressEndBefore
    ? new Date(
        input.startDateTime.getTime() - pressEndBefore * 24 * 60 * 60 * 1000
      )
    : undefined;
  const updatedEvent = await PrismaEvent.updateAndIncludeOccurrences(id, {
    ...data,
    pressStartDate,
    pressEndDate,
  });
  return updatedEvent;
};

const updateEvent = { input, resolve };

export default updateEvent;
