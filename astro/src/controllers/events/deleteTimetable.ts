import supabaseClient from '@lib/supabaseClient';
import { PrismaEvent } from '@models';
import { z } from 'zod';

const input = z.object({
  id: z.number(),
  timetableFileKey: z.string(),
});

type Input = z.infer<typeof input>;

const resolve = async ({ input }: { input: Input }) => {
  const { id, timetableFileKey } = input;
  const updatedEvent = await PrismaEvent.updateAndIncludeOccurrences(id, {
    timetableFileKey: null,
  });
  await supabaseClient.storage
    .from('files')
    .remove([timetableFileKey.slice(6)]);
  return updatedEvent;
};

const deleteEventTimetable = { input, resolve };

export default deleteEventTimetable;
