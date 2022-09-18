import supabaseClient from '@lib/supabaseClient';
import { PrismaEvent } from '@models';
import { z } from 'zod';

const input = z.number();

type Input = z.infer<typeof input>;

const resolve = async ({ input: id }: { input: Input }) => {
  const event = await PrismaEvent.findUnique({ where: { id } });
  if (!event) return;
  const filesToDelete: string[] = [];
  const { timetableFileKey, resultsFileKey } = event;
  if (timetableFileKey) filesToDelete.push(timetableFileKey.slice(6));
  if (resultsFileKey) filesToDelete.push(resultsFileKey.slice(6));
  if (filesToDelete.length) {
    await supabaseClient.storage.from('files').remove(filesToDelete);
  }
  await PrismaEvent.delete({ where: { id } });
};

const deleteEvent = { input, resolve };

export default deleteEvent;
