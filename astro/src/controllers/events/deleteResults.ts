import supabaseClient from "@lib/supabaseClient";
import { PrismaEvent } from "@models";
import { z } from "zod";

const input = z.object({
  id: z.number(),
  resultsFileKey: z.string(),
});

type Input = z.infer<typeof input>;

const resolve = async ({ input }: { input: Input }) => {
  const { id, resultsFileKey } = input;
  const updatedEvent = await PrismaEvent.updateAndIncludeOccurrences(id, {
    resultsFileKey: null,
  });
  await supabaseClient.storage.from("files").remove([resultsFileKey.slice(6)]);
  return updatedEvent;
};

const deleteEventResults = { input, resolve };

export default deleteEventResults;
