import { GENDERS, LEAGUES_BY_GENDER } from '@utils/records';
import { parameterize } from 'inflected';
import { FaSolidBars, FaSolidX } from 'solid-icons/fa';
import { HiSolidChevronDown } from 'solid-icons/hi';
import { createSignal, For } from 'solid-js';

const MainNavigation = () => {
  return (
    <>
      <div class="hidden xl:block">
        <LaptopMainNavigation />
      </div>
      <div class="xl:hidden">
        <MobileMainNavigation />
      </div>
    </>
  );
};

const LaptopMainNavigation = () => {
  const [showRecordsNav, setShowRecordsNav] = createSignal(false);
  const recordsNavVisibilityStyle = () => {
    return showRecordsNav()
      ? 'duration-200 ease-out opacity-100 translate-y-0'
      : 'ease-in duration-150 opacity-0 translate-y-1 pointer-events-none';
  };
  return (
    <nav
      class="relative flex items-center justify-center p-8"
      aria-label="Global"
    >
      <a href="/" rel="prefetch">
        <span class="sr-only">Etusivu</span>
        <img src="/images/logo.svg" alt="Logo" class="h-14 w-auto" />
      </a>
      <div class="ml-10 flex gap-10">
        <a
          href="/uutiset"
          rel="prefetch"
          class="text-white hover:text-gray-300"
        >
          Uutiset
        </a>
        <a
          href="/tapahtumat"
          rel="prefetch"
          class="text-white hover:text-gray-300"
        >
          Tapahtumat
        </a>
        <a
          href="/tulokset"
          rel="prefetch"
          class="text-white hover:text-gray-300"
        >
          Tulokset
        </a>
        <div class="relative">
          <button
            onClick={() => setShowRecordsNav(!showRecordsNav())}
            class="flex items-center text-white hover:text-gray-300"
          >
            Seuraennätykset <HiSolidChevronDown class="ml-2 h-6 w-6" />
          </button>
          <div
            class={`absolute left-1/2 z-10 mt-4 grid w-screen max-w-lg -translate-x-1/2 grid-cols-3 overflow-hidden rounded-lg bg-white p-5 font-sans shadow-lg ring-black/5 transition focus-within:translate-y-0 focus-within:opacity-100 ${recordsNavVisibilityStyle()}`}
          >
            <For each={GENDERS}>
              {(gender) => (
                <div>
                  <div class="mb-3 ml-3 font-semibold text-blue-700">
                    {gender}
                  </div>
                  <ul
                    class="space-y-1 text-base font-medium text-gray-500"
                    aria-label="Sidebar"
                  >
                    <For each={LEAGUES_BY_GENDER[gender]}>
                      {(league) => (
                        <li>
                          <a
                            href={`/seuraennatykset/${parameterize(
                              league
                            )}#main`}
                            class="block rounded-md px-3 py-2 hover:bg-gray-50 hover:text-gray-900"
                          >
                            {league}
                          </a>
                        </li>
                      )}
                    </For>
                  </ul>
                </div>
              )}
            </For>
          </div>
        </div>
        <a
          href="/edustusurheilijat"
          rel="prefetch"
          class="text-white hover:text-gray-300"
        >
          Edustusurheilijat
        </a>
        <a
          href="/yhteystiedot"
          rel="prefetch"
          class="text-white hover:text-gray-300"
        >
          Yhteystiedot
        </a>
      </div>
    </nav>
  );
};

const MobileMainNavigation = () => {
  const [showMenu, setShowMenu] = createSignal(false);
  const menuVisibilityStyle = () => {
    return showMenu()
      ? 'duration-200 ease-out opacity-100 translate-x-0'
      : 'ease-in duration-150 opacity-0 translate-x-10 pointer-events-none';
  };
  return (
    <nav
      class="relative flex items-center justify-between p-4 md:p-8"
      aria-label="Global"
    >
      <a href="/" rel="prefetch">
        <span class="sr-only">Etusivu</span>
        <img src="/images/logo.svg" alt="Logo" class="h-12 w-auto md:h-14" />
      </a>
      <button onClick={() => setShowMenu(!showMenu())}>
        <FaSolidBars class="h-8 w-8 text-white md:h-10 md:w-10" />
      </button>
      <div
        class={`fixed right-0 top-0 z-10 flex h-screen w-screen flex-col overflow-y-auto bg-white p-4 pt-16 font-sans font-medium text-gray-500 shadow-lg ring-1 ring-black/5 sm:max-w-sm ${menuVisibilityStyle()}`}
      >
        <button
          class="absolute right-7 top-7"
          onClick={() => setShowMenu(!showMenu())}
        >
          <FaSolidX class="h-6 w-6" />
        </button>
        <a
          href="/uutiset"
          rel="prefetch"
          class="block rounded-md p-3 hover:bg-gray-50 hover:text-gray-900"
        >
          Uutiset
        </a>
        <a
          href="/tapahtumat"
          rel="prefetch"
          class="block rounded-md p-3 hover:bg-gray-50 hover:text-gray-900"
        >
          Tapahtumat
        </a>
        <a
          href="/tulokset"
          rel="prefetch"
          class="block rounded-md p-3 hover:bg-gray-50 hover:text-gray-900"
        >
          Tulokset
        </a>
        <details>
          <summary class="rounded-md p-3 hover:bg-gray-50 hover:text-gray-900">
            <span class="ml-1">Seuraennätykset</span>
          </summary>
          <For each={GENDERS}>
            {(gender) => (
              <details class="ml-4">
                <summary class="rounded-md p-3 hover:bg-gray-50 hover:text-gray-900">
                  <span class="ml-1">{gender}</span>
                </summary>
                <For each={LEAGUES_BY_GENDER[gender]}>
                  {(league) => (
                    <a
                      href={`/seuraennatykset/${parameterize(league)}#main`}
                      class="ml-4 block rounded-md p-3 hover:bg-gray-50 hover:text-gray-900"
                    >
                      {league}
                    </a>
                  )}
                </For>
              </details>
            )}
          </For>
        </details>
        <a
          href="/edustusurheilijat"
          rel="prefetch"
          class="block rounded-md p-3 hover:bg-gray-50 hover:text-gray-900"
        >
          Edustusurheilijat
        </a>
        <a
          href="/yhteystiedot"
          rel="prefetch"
          class="block rounded-md p-3 hover:bg-gray-50 hover:text-gray-900"
        >
          Yhteystiedot
        </a>
      </div>
    </nav>
  );
};

export default MainNavigation;
