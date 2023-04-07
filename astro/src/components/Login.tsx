import { useAuth } from "src/auth";

const Login = () => {
  const { isLoggedIn, signIn, signOut } = useAuth();
  return (
    <button
      onClick={() =>
        isLoggedIn() ? signOut() : signIn({ provider: "google" })
      }
    >
      &copy;
    </button>
  );
};

export default Login;
