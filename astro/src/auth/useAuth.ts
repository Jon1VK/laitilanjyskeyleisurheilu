import { signIn, signOut } from '@astro-auth/client';
import type { Accessor } from 'solid-js';
import { User, user } from './UserStore';

const loggedIn = () => !!user();

const useAuth = () => ({
  user: user as Accessor<User>,
  loggedIn,
  signIn,
  signOut,
});

export default useAuth;
