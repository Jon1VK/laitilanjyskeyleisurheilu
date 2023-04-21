import type { DataTransformerOptions } from "@trpc/server";
import jsonComplete from "json-complete";

export const transformer: DataTransformerOptions = {
  serialize: jsonComplete.encode,
  deserialize: jsonComplete.decode,
};
