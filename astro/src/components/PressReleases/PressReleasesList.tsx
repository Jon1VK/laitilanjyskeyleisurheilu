import { useAuth } from '@auth';
import type { PressRelease } from '@prisma/client';
import {
  HiOutlineMail,
  HiOutlineTrash,
  HiSolidPencilAlt,
} from 'solid-icons/hi';
import { For, Show, createSignal } from 'solid-js';
import Modal from '../Modal';
import PressReleaseForm from './PressReleaseForm';
import { usePressReleasesModifier } from './PressReleasesModifier';

const PressReleasesList = () => {
  const { isAdmin } = useAuth();
  const { pressReleases, updatePressRelease, deletePressRelease } =
    usePressReleasesModifier();
  const [selectedPressRelease, setSelectedPressRelease] =
    createSignal<PressRelease>();
  const handleEditFormSubmit = async (formData: FormData) => {
    await updatePressRelease(selectedPressRelease()?.id as number, formData);
    setSelectedPressRelease(undefined);
  };
  return (
    <>
      <div class="mx-auto mt-12 max-w-lg divide-y divide-gray-100 overflow-hidden rounded-lg bg-white text-sm shadow ring-1 ring-black/5">
        <For each={pressReleases()}>
          {(pressRelease) => (
            <div class="relative focus-within:bg-gray-50 hover:bg-gray-100">
              <div class="flex w-full items-center p-6 font-medium text-blue-700">
                <HiOutlineMail class="h-7 w-7" />
                <time class="ml-3 first-letter:uppercase">
                  {new Date(pressRelease.sendDate).toLocaleDateString('fi', {
                    timeZone: 'Europe/Helsinki',
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
              <Show when={isAdmin()}>
                <div class="absolute right-6 top-1/2 flex -translate-y-1/2 gap-2">
                  <button
                    onClick={() => setSelectedPressRelease(pressRelease)}
                    class="rounded-md border border-gray-300 bg-white p-2 font-semibold text-gray-700 shadow-sm hover:bg-blue-700 hover:text-white focus:bg-blue-700 focus:text-white"
                  >
                    <HiSolidPencilAlt class="h-5 w-5" />
                    <span class="sr-only">
                      Muokkaa tiedotetta{' '}
                      {pressRelease.sendDate.toLocaleDateString('sv')}
                    </span>
                  </button>
                  <button
                    onClick={() => deletePressRelease(pressRelease)}
                    class="rounded-md border border-gray-300 bg-white p-2 font-semibold text-gray-700 shadow-sm hover:bg-red-600 hover:text-white focus:bg-red-600 focus:text-white"
                  >
                    <HiOutlineTrash class="h-5 w-5" />
                    <span class="sr-only">
                      Poista tiedote{' '}
                      {pressRelease.sendDate.toLocaleDateString('sv')}
                    </span>
                  </button>
                </div>
              </Show>
            </div>
          )}
        </For>
      </div>
      <Show when={selectedPressRelease()}>
        <Modal close={() => setSelectedPressRelease(undefined)}>
          <PressReleaseForm
            pressRelease={selectedPressRelease() as PressRelease}
            onSubmit={handleEditFormSubmit}
          />
        </Modal>
      </Show>
    </>
  );
};

export default PressReleasesList;
