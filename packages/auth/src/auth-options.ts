import AstroAuth from "@astro-auth/core";
import { GoogleProvider } from "@astro-auth/providers";
import { prisma } from "@laitjy/db";

export type Session = {
  user: {
    readonly id: number;
    readonly name: string;
    readonly email: string;
    readonly image?: string;
    readonly isAdmin: boolean;
    readonly isAthlete: boolean;
  };
};

export const requestHandler = AstroAuth({
  authProviders: [
    GoogleProvider({
      clientId: import.meta.env.GOOGLE_CLIENT_ID,
      clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  hooks: {
    signIn: async ({ user }: Session) => {
      const dbUser = await prisma.user.findUnique({
        where: { email: user.email },
      });
      return dbUser ? true : "/403";
    },
    jwt: async (session: Session) => {
      const { user } = session;
      const dbUser = await prisma.user.findUnique({
        where: { email: user.email },
      });
      return {
        ...session,
        user: {
          ...dbUser,
          image: user.image,
        },
      };
    },
  },
});
