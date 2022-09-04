import { useAuth } from '@auth';
import type { EventCalendarNavigator } from '@hooks';
import {
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlinePlus,
} from 'solid-icons/hi';
import { createSignal, Show, splitProps } from 'solid-js';
import EventForm from '../EventForm';
import Modal from '../Modal';

const EventCalendarHeader = (props: {
  eventCalendarNavigator: EventCalendarNavigator;
}) => {
  const [{ eventCalendarNavigator }, _] = splitProps(props, [
    'eventCalendarNavigator',
  ]);
  const { loggedIn } = useAuth();
  const [showForm, setShowForm] = createSignal(false);
  const {
    datetime,
    humanized,
    createEvent,
    navigateToPrevMonth,
    navigateToNextMonth,
  } = eventCalendarNavigator;
  const handleFormSubmit = async (formData: FormData) => {
    try {
      await createEvent(formData);
      setShowForm(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <header class="flex items-center justify-between rounded-t-lg border-b border-gray-200 bg-blue-600 py-3 px-5 lg:flex-none">
        <h1 class="font-semibold text-white md:text-lg">
          <time
            class="inline-block first-letter:uppercase"
            datetime={datetime()}
          >
            {humanized()}
          </time>
        </h1>
        <div class="flex items-center">
          <div class="flex items-center rounded-md shadow-sm">
            <button
              type="button"
              onClick={navigateToPrevMonth}
              class="flex items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-white py-1 pl-1 pr-2 text-gray-400 hover:text-gray-500 md:py-2 md:pl-2 md:pr-3 md:hover:bg-gray-50"
            >
              <span class="sr-only">Edellinen kuukausi</span>
              <HiOutlineChevronLeft class="h-5 w-5" />
            </button>
            <span class="relative -mx-px h-5 w-px bg-gray-300" />
            <button
              type="button"
              onClick={navigateToNextMonth}
              class="flex items-center justify-center rounded-r-md border border-l-0 border-gray-300 bg-white py-1 pl-2 pr-1 text-gray-400 hover:text-gray-500 md:py-2 md:pl-3 md:pr-2 md:hover:bg-gray-50"
            >
              <span class="sr-only">Seuraava kuukausi</span>
              <HiOutlineChevronRight class="h-5 w-5" />
            </button>
          </div>
          <Show when={loggedIn()}>
            <div class="mx-3 h-4 w-px bg-gray-300 md:mx-6 md:h-6" />
            <button
              onClick={() => setShowForm(true)}
              class="rounded-md border border-gray-300 bg-white py-1 px-2 text-sm font-medium text-gray-400 shadow-sm hover:bg-gray-50 hover:text-gray-500 md:py-2 md:px-4"
            >
              <span class="sr-only">Lisää tapahtuma</span>
              <HiOutlinePlus class="h-5 w-5" />
            </button>
          </Show>
        </div>
      </header>
      <Show when={showForm()}>
        <Modal close={() => setShowForm(false)}>
          <EventForm onSubmit={handleFormSubmit} />
        </Modal>
      </Show>
    </>
  );
};

export default EventCalendarHeader;