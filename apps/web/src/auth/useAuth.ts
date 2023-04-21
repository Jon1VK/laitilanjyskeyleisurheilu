import { user } from "./UserStore";
import { signIn, signOut } from "@laitjy/auth";
import type { Session } from "@laitjy/auth";
import type { User } from "@laitjy/db";
import type { Accessor } from "solid-js";

const isLoggedIn = () => !!user();
const isAdmin = () => !!user()?.isAdmin;
const isAthlete = () => !!user()?.isAthlete;
const isLoggedInUser = (anotherUser: User) => {
  return anotherUser.email === user()?.email;
};

const useAuth = () => ({
  user: user as Accessor<Session["user"]>,
  isLoggedIn,
  isLoggedInUser,
  isAdmin,
  isAthlete,
  signIn,
  signOut,
});

export default useAuth;
