import { PrismaEvent } from '@models';
import { parameterize } from 'inflected';
import { z } from 'zod';

const input = z.object({
  type: z.enum(['PRACTICE', 'COMPETITION', 'OTHER']),
  title: z.string().min(1),
  startDateTime: z.date(),
  endDateTime: z.date().nullable().optional(),
  location: z.string().min(1).nullable().optional(),
  description: z.string().min(1).nullable().optional(),
  externalUrl: z.string().min(1).nullable().optional(),
  pressStartBefore: z.number().min(7).max(21),
  pressEndBefore: z.number().min(1).max(14),
  pressBody: z.string().min(1).nullable().optional(),
  recurringEventId: z.number().optional(),
});

type Input = z.infer<typeof input>;

const resolve = async ({ input }: { input: Input }) => {
  const { pressStartBefore, pressEndBefore, ...data } = input;
  const titleSlug = parameterize(input.title);
  const dateSlug = input.startDateTime.toLocaleDateString('sv');
  const slug = `${dateSlug}-${titleSlug}`;
  const pressStartDate = new Date(
    input.startDateTime.getTime() - pressStartBefore * 24 * 60 * 60 * 1000
  );
  const pressEndDate = new Date(
    input.startDateTime.getTime() - pressEndBefore * 24 * 60 * 60 * 1000
  );
  return await PrismaEvent.create({
    data: { ...data, slug, pressEndDate, pressStartDate },
  });
};

const createEvent = { input, resolve };

export default createEvent;
