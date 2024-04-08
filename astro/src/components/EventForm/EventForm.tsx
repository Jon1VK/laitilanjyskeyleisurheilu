import type { EventType, Event as IEvent } from "@prisma/client";
import { HiSolidPencilSquare } from "solid-icons/hi";
import { Show, createSignal } from "solid-js";
import type { RouterOutput } from "~/server/router";
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
  update?: boolean;
  updateMany?: boolean;
}) => {
  const [eventType, setEventType] = createSignal<EventType>("PRACTICE");
  const [isRecurring, setIsRecurring] = createSignal(false);
  const [competition, setCompetition] =
    createSignal<RouterOutput["event"]["fetchCompetitionData"]>();
  const handleSubmit: SubmitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    props.onSubmit(formData);
  };
  return (
    <>
      <h3 class="mb-3 flex items-center gap-2 text-lg font-medium leading-6 text-gray-900">
        <Show when={!props.update && !props.updateMany}>
          Luo uusi tapahtuma{props.event && "kerta"}
        </Show>
        <Show when={props.update || props.updateMany}>
          <HiSolidPencilSquare class="h-5 w-5" />
        </Show>
        <Show when={props.update}>Muokkaa tapahtumaa</Show>
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
          competition={competition()}
          setCompetition={setCompetition}
          isCompetition={[props.event?.type, eventType()].includes(
            "COMPETITION"
          )}
          isRecurring={isRecurring()}
          updateMany={props.updateMany}
        />
        <EventFormPressFieldset
          event={props.event}
          competition={competition()}
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
