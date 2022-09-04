import { createSignal, splitProps } from 'solid-js';

export interface User {
  readonly name: string;
  readonly email: string;
  readonly image: string;
}

const [user, setUser] = createSignal<User | undefined>();

export { user };

const UserStore = (props: { user: User | undefined }) => {
  const [{ user }, _] = splitProps(props, ['user']);
  setUser(user);
};

export default UserStore;
