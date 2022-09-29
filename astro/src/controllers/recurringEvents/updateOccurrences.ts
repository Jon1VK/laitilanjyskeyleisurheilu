import { PrismaRecurringEvent } from '@models';
import { z } from 'zod';

const input = z.object({
  id: z.number().int(),
  title: z.string().min(1),
  location: z.string().min(1).nullable().optional(),
  description: z.string().min(1).nullable().optional(),
  pressBody: z.string().min(1).nullable().optional(),
});

type Input = z.infer<typeof input>;

const resolve = async ({ input }: { input: Input }) => {
  const { id, ...data } = input;
  const updatedRecurringEvent = await PrismaRecurringEvent.updateAllOccurrences(
    id,
    data
  );
  return updatedRecurringEvent;
};

const updateRecurringEventOccurrences = { input, resolve };

export default updateRecurringEventOccurrences;
