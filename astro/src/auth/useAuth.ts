import type { User } from "@prisma/client";
import type { ExtendedUser } from "@server/models";
import { createAuthClient } from "better-auth/solid";
import type { Accessor } from "solid-js";
import { user } from "./UserStore";

const authClient = createAuthClient();

const isLoggedIn = () => !!user();
const isAdmin = () => !!user()?.isAdmin;
const isAthlete = () => !!user()?.isAthlete;
const isLoggedInUser = (anotherUser: User) => {
  return anotherUser.email === user()?.email;
};

const useAuth = () => ({
  user: user as Accessor<ExtendedUser>,
  isLoggedIn,
  isLoggedInUser,
  isAdmin,
  isAthlete,
  signIn: authClient.signIn.social,
  signOut: authClient.signOut,
});

export default useAuth;
