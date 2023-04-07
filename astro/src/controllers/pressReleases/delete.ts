import { PrismaPressRelease } from "@models";
import { z } from "zod";

const input = z.number();

type Input = z.infer<typeof input>;

const resolve = async ({ input: id }: { input: Input }) => {
  await PrismaPressRelease.delete({ where: { id } });
};

const deletePressRelease = { input, resolve };

export default deletePressRelease;
