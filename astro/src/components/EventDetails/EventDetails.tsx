import { useAuth } from '@auth';
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
  const { event, updateEvent, deleteEvent, deleteOccurrence } =
    useEventDetailsModifier();
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
        <div class="prose prose-blue mx-auto mt-6 text-lg text-gray-600">
          <p>{event().description}</p>
        </div>
        {event().recurringEventId && (
          <div class="relative mx-auto max-w-prose text-lg sm:px-0">
            <h2 class="mt-8 mb-4 text-2xl font-bold">Muut harjoituskerrat</h2>
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
    </>
  );
};

export default EventDetails;
