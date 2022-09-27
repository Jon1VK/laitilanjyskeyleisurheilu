import { PrismaEvent } from '@models';
import { z } from 'zod';

const input = z.number().int();

type Input = z.infer<typeof input>;

const resolve = async ({ input: id }: { input: Input }) => {
  await PrismaEvent.updateMany({
    where: { promote: true },
    data: { promote: false },
  });
  return await PrismaEvent.updateAndIncludeOccurrences(id, { promote: true });
};

const promoteEvent = { input, resolve };

export default promoteEvent;
