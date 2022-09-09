import { PrismaRecurringEvent } from '@models';
import { z } from 'zod';

const input = z.number();

type Input = z.infer<typeof input>;

const resolve = async ({ input: id }: { input: Input }) => {
  await PrismaRecurringEvent.delete({ where: { id } });
};

const deleteRecurringEvent = { input, resolve };

export default deleteRecurringEvent;
