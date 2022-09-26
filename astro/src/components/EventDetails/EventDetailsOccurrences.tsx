import { useAuth } from '@auth';
import type { RecurringEvent } from '@prisma/client';
import { FaSolidPlus } from 'solid-icons/fa';
import { HiOutlineTrash } from 'solid-icons/hi';
import { createSignal, Show } from 'solid-js';
import EventForm from '../EventForm';
import EventListStateless from '../EventListStateless';
import Modal from '../Modal';
import { useEventDetailsModifier } from './EventDetailsModifier';

const EventDetailsOccurrences = () => {
  const { isAdmin } = useAuth();
  const { event, deleteOccurrence, deleteRecurringEvent, createOccurrence } =
    useEventDetailsModifier();
  const [showNewOccurrenceForm, setShowNewOccurrenceForm] = createSignal(false);
  const [showConfirmation, setShowConfirmation] = createSignal(false);
  const handleNewOccurranceFormSubmit = async (formData: FormData) => {
    await createOccurrence(formData);
    setShowNewOccurrenceForm(false);
  };
  return (
    <>
      <Show when={event().recurringEventId}>
        <div class="relative mx-auto max-w-prose text-lg sm:px-0">
          <div class="mt-8 mb-4">
            <h2 class="text-2xl font-bold">Muut harjoituskerrat</h2>
            <Show when={isAdmin()}>
              <div class="mt-3 flex items-center gap-1">
                <button
                  onClick={() => setShowNewOccurrenceForm(true)}
                  class="rounded-md border border-gray-300 bg-white p-2 font-semibold text-gray-700 shadow-sm hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white"
                >
                  <FaSolidPlus class="h-4 w-4" />
                  <span class="sr-only">Lisää uusi tapahtumakerta</span>
                </button>
                <button
                  onClick={() => setShowConfirmation(true)}
                  class="rounded-md border border-gray-300 bg-white p-2 font-semibold text-gray-700 shadow-sm hover:bg-red-600 hover:text-white focus:bg-red-600 focus:text-white"
                >
                  <HiOutlineTrash class="h-4 w-4" />
                  <span class="sr-only">Poista koko sarja</span>
                </button>
              </div>
            </Show>
          </div>
          <EventListStateless
            events={event().recurringEvent?.occurrences ?? []}
            onDelete={deleteOccurrence}
          />
        </div>
      </Show>
      <Show when={showNewOccurrenceForm()}>
        <Modal close={() => setShowNewOccurrenceForm(false)}>
          <EventForm event={event()} onSubmit={handleNewOccurranceFormSubmit} />
        </Modal>
      </Show>
      <Show when={showConfirmation()}>
        <Modal close={() => setShowConfirmation(false)}>
          <h3 class="mb-6 flex items-center gap-3 text-lg font-medium leading-6 text-gray-900">
            <HiOutlineTrash class="h-5 w-5" />
            {event().title}
          </h3>
          <p class="text-gray-600">
            Olet poistamassa tapahtuman "{event().title}" kaikki{' '}
            {(event().recurringEvent?.occurrences.length as number) + 1}{' '}
            tapahtumakertaa. Haluatko suorittaa toiminnon loppuun?
          </p>
          <div class="mt-6 flex items-center gap-4">
            <button
              type="submit"
              onClick={() =>
                deleteRecurringEvent(event().recurringEvent as RecurringEvent)
              }
              class="rounded-md bg-red-700 py-2 px-4 text-base font-medium text-white shadow-sm hover:bg-red-800"
            >
              Poista
            </button>
            <button
              type="submit"
              onClick={() => setShowConfirmation(false)}
              class="rounded-md border border-gray-300 bg-gray-50 py-2 px-4 font-medium shadow-sm hover:bg-gray-200"
            >
              Peruuta
            </button>
          </div>
        </Modal>
      </Show>
    </>
  );
};

export default EventDetailsOccurrences;
