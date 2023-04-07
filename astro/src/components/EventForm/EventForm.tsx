import type { EventType, Event as IEvent } from "@prisma/client";
import { HiSolidPencilAlt } from "solid-icons/hi";
import { Show, createSignal } from "solid-js";
import EventFormDetailsFieldSet from "./EventFormDetailsFieldSet";
import EventFormPressFieldset from "./EventFormPressFieldset";
import EventFormRecurrenceFieldset from "./EventFormRecurrenceFieldset";
import EventFormTypeFieldset from "./EventFormTypeFieldset";

type SubmitHandler = (
  event: Event & { currentTarget: HTMLFormElement }
) => void;

const EventForm = (props: {
  event?: IEvent;
  onSubmit: (formData: FormData) => void;
  updateMany?: boolean;
}) => {
  const [eventType, setEventType] = createSignal<EventType>("PRACTICE");
  const [isRecurring, setIsRecurring] = createSignal(false);
  const handleSubmit: SubmitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    props.onSubmit(formData);
  };
  return (
    <>
      <h3 class="mb-3 flex items-center gap-2 text-lg font-medium leading-6 text-gray-900">
        <Show when={!props.event}>Luo uusi tapahtuma</Show>
        <Show when={props.event}>
          <HiSolidPencilAlt class="h-5 w-5" />
        </Show>
        <Show when={props.event && !props.updateMany}>Muokkaa tapahtumaa</Show>
        <Show when={props.updateMany}>Muokkaa kaikkia tapahtumakertoja</Show>
      </h3>
      <form onSubmit={handleSubmit} class="space-y-6 text-sm">
        <Show when={!props.event}>
          <EventFormTypeFieldset
            eventType={eventType()}
            setEventType={setEventType}
          />
          <EventFormRecurrenceFieldset
            isRecurring={isRecurring()}
            setIsRecurring={setIsRecurring}
          />
        </Show>
        <EventFormDetailsFieldSet
          event={props.event}
          eventType={eventType()}
          isRecurring={isRecurring()}
          updateMany={props.updateMany}
        />
        <EventFormPressFieldset
          event={props.event}
          updateMany={props.updateMany}
        />
        <fieldset>
          <button
            type="submit"
            class="w-full rounded-md bg-blue-700 px-4 py-2 font-medium text-white shadow-sm hover:bg-blue-800 sm:w-1/2"
          >
            Tallenna
          </button>
        </fieldset>
      </form>
    </>
  );
};

export default EventForm;
