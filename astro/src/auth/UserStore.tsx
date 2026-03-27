import type { ExtendedUser } from "@server/models";
import { createSignal, onMount } from "solid-js";

const [user, setUser] = createSignal<ExtendedUser>();

export { user };

const UserStore = (props: { user: ExtendedUser }) => {
  onMount(() => setTimeout(() => setUser(props.user), 500));
};

export default UserStore;
