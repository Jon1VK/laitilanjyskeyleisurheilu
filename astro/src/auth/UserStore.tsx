import type { ExtendedUser } from "@models";
import { createEffect, createSignal } from "solid-js";

const [user, setUser] = createSignal<ExtendedUser>();

export { user };

const UserStore = (props: { user: ExtendedUser }) => {
  createEffect(() => setUser(props.user));
};

export default UserStore;
