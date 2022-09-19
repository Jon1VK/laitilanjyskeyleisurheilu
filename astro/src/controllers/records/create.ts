import { PrismaRecord } from '@models';
import { EVENTS, LEAGUES } from '@utils/records';
import { z } from 'zod';

const input = z.object({
  league: z.enum(LEAGUES),
  athlete: z.string().min(1),
  event: z.enum(EVENTS),
  result: z.string().min(1),
  achievedAt: z.date(),
  location: z.string().min(1),
});

type Input = z.infer<typeof input>;

const resolve = async ({ input: data }: { input: Input }) => {
  await PrismaRecord.create({ data });
};

const createRecord = { input, resolve };

export default createRecord;
