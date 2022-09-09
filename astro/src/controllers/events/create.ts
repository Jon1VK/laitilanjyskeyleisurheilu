import { PrismaEvent } from '@models';
import { parameterize } from 'inflected';
import { z } from 'zod';

const input = z.object({
  type: z.enum(['PRACTICE', 'COMPETITION', 'OTHER']),
  startDateTime: z.date(),
  endDateTime: z.date().nullable(),
  title: z.string().min(1),
  location: z.string().min(1).nullable(),
  description: z.string().min(1).nullable(),
});

type Input = z.infer<typeof input>;

const resolve = async ({ input }: { input: Input }) => {
  const titleSlug = parameterize(input.title);
  const dateSlug = input.startDateTime.toLocaleDateString('sv');
  const slug = `${dateSlug}-${titleSlug}`;
  await PrismaEvent.create({ data: { ...input, slug } });
};

const createEvent = { input, resolve };

export default createEvent;
