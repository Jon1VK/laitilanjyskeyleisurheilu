import { useAuth } from 'src/auth';

const Login = () => {
  const { loggedIn, signIn, signOut } = useAuth();
  return (
    <button
      onClick={() => (loggedIn() ? signOut() : signIn({ provider: 'google' }))}
    >
      &copy;
    </button>
  );
};

export default Login;
