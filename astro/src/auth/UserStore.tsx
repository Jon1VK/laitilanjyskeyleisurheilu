import type { UserWithImage } from '@models';
import { createSignal, splitProps } from 'solid-js';

const [user, setUser] = createSignal<UserWithImage | null>();

export { user };

const UserStore = (props: { user?: UserWithImage | null }) => {
  const [{ user }, _] = splitProps(props, ['user']);
  setUser(user);
};

export default UserStore;
