import { PrismaAthleteProfile } from "@server/models";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { supabaseClient } from "~/services/supabaseClient";
import { athleteProtectedProcedure } from "../trpc";

export const updateAthleteProfile = athleteProtectedProcedure
  .input(
    z.object({
      heroImage: z.string().optional(),
      avatar: z.string().optional(),
      mainEvents: z.string().optional(),
      description: z.string().optional(),
      instagram: z.string().optional(),
      linkedin: z.string().optional(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const athleteProfile = await PrismaAthleteProfile.findUnique({
      where: { userId: ctx.user.id },
    });
    if (!athleteProfile) throw new TRPCError({ code: "CONFLICT" });
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
    return await ctx.prisma.athleteProfile.update({
      where: { id: athleteProfile.id },
      data: input,
      include: { athlete: true },
    });
  });
