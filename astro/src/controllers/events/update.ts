import { PrismaEvent } from '@models';
import { z } from 'zod';

const input = z.object({
  id: z.number().int(),
  startDateTime: z.date(),
  endDateTime: z.date().nullable(),
  location: z.string().min(1).nullable(),
  description: z.string().min(1).nullable(),
});

type Input = z.infer<typeof input>;

const resolve = async ({ input }: { input: Input }) => {
  const { id, ...data } = input;
  const updatedEvent = await PrismaEvent.update({
    where: { id },
    data,
    include: {
      RecurringEvent: {
        include: {
          occurrences: true,
        },
      },
    },
  });
  return updatedEvent;
};

const updateEvent = { input, resolve };

export default updateEvent;
