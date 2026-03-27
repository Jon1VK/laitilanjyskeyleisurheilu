import { betterAuth } from "better-auth";
import { PrismaUser } from "~/server/models";

export const auth = betterAuth({
  socialProviders: {
    google: {
      clientId: import.meta.env.GOOGLE_CLIENT_ID,
      clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET,
      mapProfileToUser: async (profile) => {
        const dbUser = await PrismaUser.findUnique({
          where: { email: profile.email },
        });
        return {
          ...profile,
          ...dbUser,
          image: profile.picture,
        };
      },
    },
  },
  user: {
    additionalFields: {
      id: {
        type: "number",
        input: false,
      },
      isAdmin: {
        type: "boolean",
        default: false,
        input: false,
      },
      isAthlete: {
        type: "boolean",
        default: false,
        input: false,
      },
      image: {
        type: "string",
        input: false,
      },
    },
  },
});
