import { signIn, signOut } from "@astro-auth/client";
import type { ExtendedUser } from "@models";
import type { User } from "@prisma/client";
import type { Accessor } from "solid-js";
import { user } from "./UserStore";

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
  signIn,
  signOut,
});

export default useAuth;
