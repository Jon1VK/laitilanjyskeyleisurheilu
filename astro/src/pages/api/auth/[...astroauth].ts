import AstroAuth from "@astro-auth/core";
import { GoogleProvider } from "@astro-auth/providers";
import { PrismaUser } from "@models";
import type { JwtPayload } from "jsonwebtoken";

export const all = AstroAuth({
  authProviders: [
    GoogleProvider({
      clientId: import.meta.env.GOOGLE_CLIENT_ID,
      clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  hooks: {
    signIn: async ({ user }: JwtPayload) => {
      const dbUser = await PrismaUser.findUnique({
        where: { email: user.email },
      });
      return dbUser ? true : "/403";
    },
    jwt: async (jwtPayload: JwtPayload) => {
      const { user } = jwtPayload;
      const dbUser = await PrismaUser.findUnique({
        where: { email: user.email },
      });
      return {
        ...jwtPayload,
        user: {
          ...dbUser,
          image: user.image,
        },
      };
    },
  },
});
