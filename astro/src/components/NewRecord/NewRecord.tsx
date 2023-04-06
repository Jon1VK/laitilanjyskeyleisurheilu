import trpcClient from '@lib/trpcClient';
import type { League, RecordEvent } from '@utils/records';
import { Show, createSignal } from 'solid-js';
import Modal from '../Modal';
import RecordForm from './RecordForm';

const NewRecord = () => {
  const [showForm, setShowForm] = createSignal(false);
  const [showConfirmation, setShowConfirmation] = createSignal(false);
  const handleFormSubmit = async (formData: FormData) => {
    await trpcClient.mutation('createRecord', {
      league: formData.get('league') as League,
      athlete: formData.get('athlete') as string,
      event: formData.get('event') as RecordEvent,
      result: formData.get('result') as string,
      achievedAt: new Date(formData.get('achievedAt') as string),
      location: formData.get('location') as string,
    });
    setShowForm(false);
    setShowConfirmation(true);
  };
  return (
    <>
      <button
        onClick={() => setShowForm(true)}
        class="cursor-pointer text-blue-800 hover:text-blue-700 hover:underline"
      >
        Ilmoita uusi ennätys
      </button>
      <Show when={showForm()}>
        <Modal close={() => setShowForm(false)}>
          <RecordForm onSubmit={handleFormSubmit} />
        </Modal>
      </Show>
      <Show when={showConfirmation()}>
        <Modal close={() => setShowConfirmation(false)}>
          <h3 class="mb-4 text-lg font-medium leading-6 text-gray-900">
            Uusi ennätys ilmoitettu
          </h3>
          <p class="mb-6">
            Ilmoittamasi ennätys tarkastetaan mahdollisimman pian!
          </p>
        </Modal>
      </Show>
    </>
  );
};

export default NewRecord;
