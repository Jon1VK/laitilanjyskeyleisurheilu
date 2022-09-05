import { useAuth } from '@auth';
import { HiOutlineLogout } from 'solid-icons/hi';
import { createSignal, Show } from 'solid-js';

const UserNavigation = () => {
  const { loggedIn, user, signOut } = useAuth();
  const [show, setShow] = createSignal(false);
  const menuVisibilityStyle = () => {
    return show()
      ? 'duration-200 ease-out opacity-100 translate-y-0'
      : 'ease-in duration-150 opacity-0 translate-y-1 pointer-events-none';
  };
  return (
    <Show when={loggedIn()}>
      <nav class="relative">
        <button onClick={() => setShow(!show())}>
          <img
            class="h-12 w-12 rounded-full md:h-14 md:w-14"
            referrerPolicy="no-referrer"
            src={
              user().image ||
              `https://ui-avatars.com/api/?background=random&name=${
                user().name
              }`
            }
            alt={`${user().name} profiilikuva`}
          />
        </button>
        <div
          class={`absolute right-0 mt-3 flex w-screen max-w-xs flex-col gap-2 rounded-lg bg-slate-50 p-4 shadow-lg ring-2 ring-black/5 transition focus-within:translate-y-0 focus-within:opacity-100 ${menuVisibilityStyle()}`}
        >
          <p class="ml-3 font-medium text-gray-900">{user().name}</p>
          <button
            class="flex items-center justify-between rounded-md p-3 text-sm text-gray-600 transition duration-150 ease-in-out hover:bg-gray-100"
            onClick={() => signOut()}
          >
            <span>Kirjaudu ulos</span>
            <HiOutlineLogout class="h-5 w-5" />
          </button>
        </div>
      </nav>
    </Show>
  );
};

export default UserNavigation;
