import trpcClient from '@lib/trpcClient';
import { createSignal, Show } from 'solid-js';
import Modal from '../Modal';

type SubmitHandler = (
  event: Event & { currentTarget: HTMLFormElement }
) => Promise<void>;

const ContactEmailForm = () => {
  const [showConfirmation, setShowConfirmation] = createSignal(false);
  const handleSubmit: SubmitHandler = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const firstname = formData.get('firstname') as string;
    const lastname = formData.get('lastname') as string;
    const email = formData.get('email') as string;
    const phone = (formData.get('phone') as string) || undefined;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;
    await trpcClient.mutation('sendContactEmail', {
      firstname,
      lastname,
      email,
      phone,
      subject,
      message,
    });
    form.reset();
    setShowConfirmation(true);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        class="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
      >
        <div>
          <label class="block text-sm font-medium text-gray-700">
            Etunimi
            <div class="mt-1">
              <input
                required
                type="text"
                name="firstname"
                autocomplete="given-name"
                class="block w-full rounded-md border-gray-300 py-3 px-4 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </label>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">
            Sukunimi
            <div class="mt-1">
              <input
                required
                type="text"
                name="lastname"
                autocomplete="family-name"
                class="block w-full rounded-md border-gray-300 py-3 px-4 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </label>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">
            Sähköposti
            <div class="mt-1">
              <input
                required
                name="email"
                type="email"
                autocomplete="email"
                class="block w-full rounded-md border-gray-300 py-3 px-4 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </label>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">
            <div class="flex justify-between">
              Puhelinnumero
              <span id="phone-optional" class="text-sm text-gray-500">
                Valinnainen
              </span>
            </div>
            <div class="mt-1">
              <input
                type="text"
                name="phone"
                autocomplete="tel"
                class="block w-full rounded-md border-gray-300 py-3 px-4 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                aria-describedby="phone-optional"
              />
            </div>
          </label>
        </div>
        <div class="sm:col-span-2">
          <label for="subject" class="block text-sm font-medium text-gray-700">
            Aihe
            <div class="mt-1">
              <input
                required
                type="text"
                name="subject"
                id="subject"
                class="block w-full rounded-md border-gray-300 py-3 px-4 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </label>
        </div>
        <div class="sm:col-span-2">
          <label for="message" class="block text-sm font-medium text-gray-700">
            Viesti
            <div class="mt-1">
              <textarea
                id="message"
                name="message"
                rows="4"
                class="block w-full rounded-md border border-gray-300 py-3 px-4 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </label>
        </div>
        <div class="sm:col-span-2 sm:flex sm:justify-end">
          <button
            type="submit"
            class="mt-2 w-full rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
          >
            Lähetä
          </button>
        </div>
      </form>
      <Show when={showConfirmation()}>
        <Modal close={() => setShowConfirmation(false)}>
          <h3 class="mb-4 text-lg font-medium leading-6 text-gray-900">
            Viesti lähetetty
          </h3>
          <p class="mb-6">
            Vastaamme lähettämääsi viestiin mahdollisimman pian!
          </p>
        </Modal>
      </Show>
    </>
  );
};

export default ContactEmailForm;
