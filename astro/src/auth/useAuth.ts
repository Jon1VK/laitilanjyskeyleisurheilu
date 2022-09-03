import { signIn, signOut } from '@astro-auth/client';
import { user } from './UserStore';

const loggedIn = () => !!user();

const useAuth = () => ({
  user: user,
  loggedIn,
  signIn,
  signOut,
});

export default useAuth;
