import type { ExtendedUser } from '@models';
import { createSignal, splitProps } from 'solid-js';

const [user, setUser] = createSignal<ExtendedUser | null>();

export { user };

const UserStore = (props: { user?: ExtendedUser | null }) => {
  const [{ user }, _] = splitProps(props, ['user']);
  setUser(user);
};

export default UserStore;
