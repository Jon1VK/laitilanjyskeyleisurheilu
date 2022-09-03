import { createSignal, splitProps } from 'solid-js';

export interface User {
  name: string;
  email: string;
  image: string;
}

const [user, setUser] = createSignal<User | null>(null);

export { user };

const UserStore = (props: { user: User | null }) => {
  const [{ user }, _] = splitProps(props, ['user']);
  setUser(user);
};

export default UserStore;
