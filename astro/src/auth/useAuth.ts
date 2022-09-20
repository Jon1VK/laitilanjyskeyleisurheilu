import { signIn, signOut } from '@astro-auth/client';
import type { UserWithImage } from '@models';
import type { Accessor } from 'solid-js';
import { user } from './UserStore';

const isLoggedIn = () => !!user();
const isAdmin = () => !!user()?.isAdmin;
const isAthlete = () => !!user()?.isAthlete;

const useAuth = () => ({
  user: user as Accessor<UserWithImage>,
  isLoggedIn,
  isAdmin,
  isAthlete,
  signIn,
  signOut,
});

export default useAuth;
