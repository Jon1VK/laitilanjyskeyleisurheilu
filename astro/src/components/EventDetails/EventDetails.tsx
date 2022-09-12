import { useAuth } from '@auth';
import type { RecurringEvent } from '@prisma/client';
import { formattedDateTimePeriod } from '@utils/dates';
import { HiOutlinePencilAlt, HiOutlineTrash } from 'solid-icons/hi';
import { createSignal, Show } from 'solid-js';
import EventForm from '../EventForm';
import EventListStateless from '../EventListStateless';
import Modal from '../Modal';
import EventDetailsModifierProvider, {
  useEventDetailsModifier,
} from './EventDetailsModifier';
import type { EventWithOccurrences } from './types';

const EventDetails = (props: { event: EventWithOccurrences }) => (
  <EventDetailsModifierProvider initialEvent={props.event}>
    <InternalEventDetails />
  </EventDetailsModifierProvider>
);

const InternalEventDetails = () => {
  const { loggedIn } = useAuth();
  const [showForm, setShowForm] = createSignal(false);
  const [showConfirmation, setShowConfirmation] = createSignal(false);
  const {
    event,
    updateEvent,
    deleteEvent,
    deleteOccurrence,
    deleteRecurringEvent,
  } = useEventDetailsModifier();
  const handleFormSubmit = async (formData: FormData) => {
    await updateEvent(event(), formData);
    setShowForm(false);
  };
  return (
    <>
      <div class="relative mx-auto max-w-prose px-6 text-lg sm:px-6 lg:px-8">
        <h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          {event().title}
        </h1>
        <Show when={loggedIn()}>
          <div class="my-3 flex gap-1">
            <button
              onClick={() => setShowForm(true)}
              class="rounded-md border border-gray-300 bg-white p-2 font-semibold text-gray-700 shadow-sm hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white"
            >
              <HiOutlinePencilAlt class="h-5 w-5" />
              <span class="sr-only">Muokkaa {event().title}</span>
            </button>
            <button
              onClick={() => deleteEvent()}
              class="rounded-md border border-gray-300 bg-white p-2 font-semibold text-gray-700 shadow-sm hover:bg-red-600 hover:text-white focus:bg-red-600 focus:text-white"
            >
              <HiOutlineTrash class="h-5 w-5" />
              <span class="sr-only">Poista {event().title}</span>
            </button>
          </div>
        </Show>
        <div class="mt-3 flex flex-col sm:mt-4">
          <span class="mb-1 text-lg font-medium text-blue-600 sm:text-xl">
            {event().location}
          </span>
          <time
            class="text-base text-gray-600 sm:text-base"
            datetime={event().startDateTime.toLocaleTimeString('sv', {
              timeZone: 'Europe/Helsinki',
            })}
          >
            {formattedDateTimePeriod(event())}
          </time>
        </div>
        <div
          // eslint-disable-next-line solid/no-innerhtml
          innerHTML={event().description || ''}
          class="prose prose-blue prose-table:text-sm prose-table:shadow prose-table:ring-1 prose-table:ring-black/5 prose-td:p-3 prose-th:p-3 prose-th:bg-blue-600 prose-th:text-white mx-auto mt-6 text-lg text-gray-600"
        />
        {event().recurringEventId && (
          <div class="relative mx-auto max-w-prose text-lg sm:px-0">
            <div class="mt-8 mb-4">
              <h2 class="text-2xl font-bold">Muut harjoituskerrat</h2>
              <Show when={loggedIn()}>
                <button
                  onClick={() => setShowConfirmation(true)}
                  class="pt-2 text-base text-red-600 hover:text-red-700 hover:underline"
                >
                  Poista koko sarja
                </button>
              </Show>
            </div>
            <EventListStateless
              events={event().RecurringEvent?.occurrences ?? []}
              onDelete={deleteOccurrence}
            />
          </div>
        )}
      </div>
      <Show when={showForm()}>
        <Modal close={() => setShowForm(false)}>
          <EventForm event={event()} onSubmit={handleFormSubmit} />
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
            {(event().RecurringEvent?.occurrences.length as number) + 1}{' '}
            tapahtumakertaa. Haluatko suorittaa toiminnon loppuun?
          </p>
          <div class="mt-6 flex items-center gap-4">
            <button
              type="submit"
              onClick={() =>
                deleteRecurringEvent(event().RecurringEvent as RecurringEvent)
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

export default EventDetails;
