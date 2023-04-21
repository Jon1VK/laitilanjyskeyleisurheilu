import type { Session } from "@laitjy/auth";
import { createEffect, createSignal } from "solid-js";

const [user, setUser] = createSignal<Session["user"]>();

export { user };

const UserStore = (props: { user: Session["user"] }) => {
  createEffect(() => setUser(props.user));
};

export default UserStore;
