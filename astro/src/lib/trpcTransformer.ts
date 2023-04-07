import type { DataTransformerOptions } from "@trpc/server";
import jsonComplete from "json-complete";

const trpcTransformer: DataTransformerOptions = {
  serialize: jsonComplete.encode,
  deserialize: jsonComplete.decode,
};

export default trpcTransformer;
