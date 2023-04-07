import {
  HiOutlinePencilAlt,
  HiOutlineSpeakerphone,
  HiOutlineTrash,
} from "solid-icons/hi";
import { Show, createSignal } from "solid-js";
import { useAuth } from "~/auth";
import { formattedDateTimePeriod } from "~/utils/dates";
import logger from "~/utils/logger";
import EventForm from "../EventForm";
import Modal from "../Modal";
import { useEventDetailsModifier } from "./EventDetailsModifier";

const EventDetailsHeader = () => {
  const { isAdmin } = useAuth();
  const { event, updateEvent, promoteEvent, deleteEvent } =
    useEventDetailsModifier();
  const [showForm, setShowForm] = createSignal(false);
  const handleFormSubmit = async (formData: FormData) => {
    try {
      await updateEvent(formData);
      setShowForm(false);
    } catch (error) {
      await logger.error(error as Error);
      alert(
        "Tietojen päivittäminen ei onnistunut. Yritä uudelleen, tai kopioi muutoksesi talteen ja lataa sivu uudelleen."
      );
    }
  };
  return (
    <>
      <header>
        <h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          {event().title}
        </h1>
        <Show when={isAdmin()}>
          <div class="my-3 flex gap-1">
            <Show when={!event().promote}>
              <button
                onClick={promoteEvent}
                class="rounded-md border border-gray-300 bg-white p-2 font-semibold text-gray-700 shadow-sm hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white"
              >
                <HiOutlineSpeakerphone class="h-5 w-5" />
                <span class="sr-only">Mainosta tapahtumaa {event().title}</span>
              </button>
            </Show>
            <Show when={event().promote}>
              <div class="rounded-md border border-gray-300 bg-green-600 p-2 font-semibold text-white shadow-sm">
                <HiOutlineSpeakerphone class="h-5 w-5" />
              </div>
            </Show>
            <button
              onClick={() => setShowForm(true)}
              class="rounded-md border border-gray-300 bg-white p-2 font-semibold text-gray-700 shadow-sm hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white"
            >
              <HiOutlinePencilAlt class="h-5 w-5" />
              <span class="sr-only">Muokkaa tapahtumaa {event().title}</span>
            </button>
            <button
              onClick={() => deleteEvent()}
              class="rounded-md border border-gray-300 bg-white p-2 font-semibold text-gray-700 shadow-sm hover:bg-red-600 hover:text-white focus:bg-red-600 focus:text-white"
            >
              <HiOutlineTrash class="h-5 w-5" />
              <span class="sr-only">Poista tapahtuma {event().title}</span>
            </button>
          </div>
        </Show>
        <div class="mt-3 flex flex-col sm:mt-4">
          <span class="mb-1 text-lg font-medium text-blue-600 sm:text-xl">
            {event().location}
          </span>
          <time
            class="text-base text-gray-600 sm:text-base"
            datetime={event().startDateTime.toLocaleTimeString("sv", {
              timeZone: "Europe/Helsinki",
            })}
          >
            {formattedDateTimePeriod(event())}
          </time>
        </div>
      </header>
      <Show when={showForm()}>
        <Modal close={() => setShowForm(false)}>
          <EventForm event={event()} onSubmit={handleFormSubmit} />
        </Modal>
      </Show>
    </>
  );
};

export default EventDetailsHeader;
