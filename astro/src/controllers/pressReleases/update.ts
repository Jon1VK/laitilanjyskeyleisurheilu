import { PrismaPressRelease } from "@models";
import { z } from "zod";

const input = z.object({
  id: z.number().int(),
  sendDate: z.date(),
  newsBody: z.string().min(1),
  whatsappBody: z.string().min(1),
});

type Input = z.infer<typeof input>;

const resolve = async ({ input }: { input: Input }) => {
  const { id, ...data } = input;
  const updatedPressRelease = await PrismaPressRelease.update({
    where: { id },
    data,
  });
  return updatedPressRelease;
};

const updatePressRelease = { input, resolve };

export default updatePressRelease;
