import EventForm from "../EventForm";
import EventListStateless from "../EventListStateless";
import Modal from "../Modal";
import { useEventDetailsModifier } from "./EventDetailsModifier";
import { FaSolidPlus } from "solid-icons/fa";
import { HiOutlinePencilAlt, HiOutlineTrash } from "solid-icons/hi";
import { Show, createSignal } from "solid-js";
import { useAuth } from "~/auth";

const EventDetailsOccurrences = () => {
  const { isAdmin } = useAuth();
  const {
    event,
    deleteOccurrence,
    deleteRecurringEvent,
    createOccurrence,
    updateOccurrences,
  } = useEventDetailsModifier();
  const [showNewOccurrenceForm, setShowNewOccurrenceForm] = createSignal(false);
  const [showEditOccurrencesConfirmation, setShowEditOccurrencesConfirmation] =
    createSignal(false);
  const [showEditOccurrencesForm, setShowEditOccurrencesForm] =
    createSignal(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    createSignal(false);
  const handleEditOccurrencesConfirmation = () => {
    setShowEditOccurrencesConfirmation(false);
    setShowEditOccurrencesForm(true);
  };
  const handleNewOccurranceFormSubmit = async (formData: FormData) => {
    await createOccurrence(formData);
    setShowNewOccurrenceForm(false);
  };
  const handleEditOccurrencesFormSubmit = async (formData: FormData) => {
    await updateOccurrences(formData);
    setShowEditOccurrencesForm(false);
  };
  return (
    <>
      <Show when={event().recurringEventId}>
        <div class="relative mx-auto max-w-prose text-lg sm:px-0">
          <div class="mb-4 mt-8">
            <h2 class="text-2xl font-bold">Muut tapahtumakerrat</h2>
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
                  onClick={() => setShowEditOccurrencesConfirmation(true)}
                  class="rounded-md border border-gray-300 bg-white p-2 font-semibold text-gray-700 shadow-sm hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white"
                >
                  <HiOutlinePencilAlt class="h-4 w-4" />
                  <span class="sr-only">
                    Muokkaa koko sarjan tapahtumakertoja
                  </span>
                </button>
                <button
                  onClick={() => setShowDeleteConfirmation(true)}
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
      <Show when={showEditOccurrencesConfirmation()}>
        <Modal close={() => setShowEditOccurrencesConfirmation(false)}>
          <h3 class="mb-6 flex items-center gap-3 text-lg font-medium leading-6 text-gray-900">
            <HiOutlinePencilAlt class="h-5 w-5" />
            Muokkaa kaikkia tapahtumakertoja
          </h3>
          <p class="mb-3 text-gray-600">
            Aiot muokata tapahtumasarjan kaikkia{" "}
            {(event().recurringEvent?.occurrences.length as number) + 1}{" "}
            tapahtumakertaa. Tämä ylikirjoittaa yksittäisten kertojen tiedot.
          </p>
          <p class="text-gray-600">
            Oletko varma, että haluat tehdä muokkaukset jokaiseen
            tapahtumakertaan?
          </p>
          <div class="mt-6 flex items-center gap-4">
            <button
              type="submit"
              onClick={handleEditOccurrencesConfirmation}
              class="rounded-md bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700"
            >
              Kyllä
            </button>
            <button
              type="submit"
              onClick={() => setShowEditOccurrencesConfirmation(false)}
              class="rounded-md border border-gray-300 bg-gray-50 px-4 py-2 font-medium shadow-sm hover:bg-gray-200"
            >
              Peruuta
            </button>
          </div>
        </Modal>
      </Show>
      <Show when={showEditOccurrencesForm()}>
        <Modal close={() => setShowEditOccurrencesForm(false)}>
          <EventForm
            event={event()}
            onSubmit={handleEditOccurrencesFormSubmit}
            updateMany
          />
        </Modal>
      </Show>
      <Show when={showDeleteConfirmation()}>
        <Modal close={() => setShowDeleteConfirmation(false)}>
          <h3 class="mb-6 flex items-center gap-3 text-lg font-medium leading-6 text-gray-900">
            <HiOutlineTrash class="h-5 w-5" />
            {event().title}
          </h3>
          <p class="mb-3 text-gray-600">
            Olet poistamassa kaikki{" "}
            {(event().recurringEvent?.occurrences.length as number) + 1}{" "}
            tapahtumakertaa.
          </p>
          <p class="text-gray-600">Haluatko suorittaa toiminnon loppuun?</p>
          <div class="mt-6 flex items-center gap-4">
            <button
              type="submit"
              onClick={deleteRecurringEvent}
              class="rounded-md bg-red-700 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-800"
            >
              Poista
            </button>
            <button
              type="submit"
              onClick={() => setShowDeleteConfirmation(false)}
              class="rounded-md border border-gray-300 bg-gray-50 px-4 py-2 font-medium shadow-sm hover:bg-gray-200"
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
