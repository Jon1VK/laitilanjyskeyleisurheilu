import { PrismaEvent } from '@models';
import { z } from 'zod';

const input = z.number();

type Input = z.infer<typeof input>;

const resolve = async ({ input: id }: { input: Input }) => {
  await PrismaEvent.delete({ where: { id } });
};

const deleteEvent = { input, resolve };

export default deleteEvent;
