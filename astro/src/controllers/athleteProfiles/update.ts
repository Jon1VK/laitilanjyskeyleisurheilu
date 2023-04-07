import type { Context } from "@lib/createContext";
import supabaseClient from "@lib/supabaseClient";
import { PrismaAthleteProfile } from "@models";
import type { AthleteProfile } from "@prisma/client";
import { z } from "zod";

const input = z.object({
  heroImage: z.string().optional(),
  avatar: z.string().optional(),
  mainEvents: z.string().optional(),
  description: z.string().optional(),
  instagram: z.string().optional(),
  linkedin: z.string().optional(),
});

type Input = z.infer<typeof input>;

const resolve = async ({ ctx, input }: { ctx: Context; input: Input }) => {
  const athleteProfile = (await PrismaAthleteProfile.findUnique({
    where: { userId: ctx.user?.id },
  })) as AthleteProfile;
  const filesToDelete: string[] = [];
  const { heroImage, avatar } = athleteProfile;
  if (input.heroImage && heroImage) {
    filesToDelete.push(heroImage.split("public/files/")[1]);
  }
  if (input.avatar && avatar)
    filesToDelete.push(avatar.split("public/files/")[1]);
  if (filesToDelete.length) {
    await supabaseClient.storage.from("files").remove(filesToDelete);
  }
  return PrismaAthleteProfile.updateAndIncludeAthlete(athleteProfile.id, input);
};

const updateAthleteProfile = { input, resolve };

export default updateAthleteProfile;
