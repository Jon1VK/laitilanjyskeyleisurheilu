import { Event as IEvent, EventType } from '@prisma/client';
import { WEEKDAYS } from '@utils/dates';
import { HiSolidPencilAlt } from 'solid-icons/hi';
import { createSignal, For, Show } from 'solid-js';

type SubmitHandler = (
  event: Event & { currentTarget: HTMLFormElement }
) => void;

const humanizedEventTypes = {
  PRACTICE: 'Harjoitus',
  COMPETITION: 'Kilpailu',
  OTHER: 'Muu tapahtuma',
};

const eventTypeColors = {
  PRACTICE: 'text-blue-600',
  COMPETITION: 'text-red-600',
  OTHER: 'text-gray-600',
};

const EventForm = (props: {
  event?: IEvent;
  onSubmit: (formData: FormData) => void;
}) => {
  const [isRecurring, setIsRecurring] = createSignal(false);
  const handleSubmit: SubmitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    props.onSubmit(formData);
  };
  return (
    <>
      <h3 class="mb-3 text-lg font-medium leading-6 text-gray-900">
        {props.event ? (
          <span class="flex items-center gap-2">
            <HiSolidPencilAlt
              class={`h-5 w-5 ${eventTypeColors[props.event.type]}`}
            />
            <span class="sr-only">Muokkaa tapahtumaa</span>
            {props.event.title}
          </span>
        ) : (
          'Luo uusi tapahtuma'
        )}
      </h3>
      <form onSubmit={handleSubmit} class="space-y-6 text-sm">
        <Show when={!props.event}>
          <fieldset>
            <div class="flex flex-col gap-3 font-medium text-gray-700 sm:flex-row sm:gap-6">
              <For each={Object.values(EventType)}>
                {(eventType) => (
                  <div class="flex items-center">
                    <input
                      id={eventType}
                      required
                      name="type"
                      value={eventType}
                      type="radio"
                      class="border-gray-300"
                    />
                    <label for={eventType} class="pl-3">
                      {humanizedEventTypes[eventType]}
                    </label>
                  </div>
                )}
              </For>
            </div>
          </fieldset>
          <fieldset>
            <legend class="mb-3 text-base font-medium text-gray-700">
              Toistuvuus
            </legend>
            <div class="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              <div class="flex items-center sm:col-span-2">
                <input
                  id="isRecurring"
                  name="isRecurring"
                  checked={isRecurring()}
                  onChange={() => setIsRecurring(!isRecurring())}
                  type="checkbox"
                  class="border-gray-300"
                />
                <label for="isRecurring" class="pl-3">
                  Viikoittain
                </label>
              </div>
              <Show when={isRecurring()}>
                <div class="flex gap-3 sm:col-span-2">
                  <For each={WEEKDAYS}>
                    {(weekday, index) => (
                      <div class="flex flex-col items-center">
                        <label
                          for={`weekday-${weekday}`}
                          class="pb-1 capitalize"
                        >
                          {weekday.slice(0, 2)}
                          <span class="sr-only">{weekday}</span>
                        </label>
                        <input
                          id={`weekday-${weekday}`}
                          name="weekdays"
                          value={(index() % 7) + 1}
                          type="checkbox"
                          class="border-gray-300"
                        />
                      </div>
                    )}
                  </For>
                </div>
                <div>
                  <label for="recurrenceStartDate">Mistä alkaen</label>
                  <input
                    required
                    type="date"
                    name="recurrenceStartDate"
                    id="recurrenceStartDate"
                    class="mt-1 w-full rounded-md border-gray-300 text-sm shadow-sm"
                  />
                </div>
                <div>
                  <label for="recurrenceEndDate">Mihin asti</label>
                  <input
                    required
                    type="date"
                    name="recurrenceEndDate"
                    id="recurrenceEndDate"
                    class="mt-1 w-full rounded-md border-gray-300 text-sm shadow-sm"
                  />
                </div>
              </Show>
            </div>
          </fieldset>
        </Show>
        <fieldset>
          <Show when={!props.event}>
            <legend class="mb-3 text-base font-medium text-gray-700">
              Tapahtuman tiedot
            </legend>
          </Show>
          <div class="grid grid-cols-1 gap-y-3 gap-x-6 sm:grid-cols-2">
            <Show when={!props.event}>
              <div class="sm:col-span-2">
                <label for="title">Otsikko</label>
                <input
                  required
                  type="text"
                  name="title"
                  id="title"
                  class="mt-1 w-full rounded-md border-gray-300 text-sm shadow-sm"
                />
              </div>
            </Show>
            <div>
              <label for="startDateTime">Alkamisaika</label>
              <input
                required
                type={isRecurring() ? 'time' : 'datetime-local'}
                value={props.event?.startDateTime.toLocaleString('sv')}
                name="startDateTime"
                id="startDateTime"
                class="mt-1 w-full rounded-md border-gray-300 text-sm shadow-sm"
              />
            </div>
            <div>
              <div class="flex justify-between">
                <label for="endDateTime">Loppumisaika</label>
                <span class="ml-auto text-gray-500">Ei pakollinen</span>
              </div>
              <input
                type={isRecurring() ? 'time' : 'datetime-local'}
                value={props.event?.endDateTime?.toLocaleString('sv')}
                name="endDateTime"
                id="endDateTime"
                class="mt-1 w-full rounded-md border-gray-300 text-sm shadow-sm"
              />
            </div>
            <div class="sm:col-span-2">
              <div class="flex justify-between">
                <label for="location">Paikka</label>
                <span class="ml-auto text-gray-500">Ei pakollinen</span>
              </div>
              <input
                type="text"
                value={props.event?.location || ''}
                name="location"
                id="location"
                class="mt-1 w-full rounded-md border-gray-300 text-sm shadow-sm"
              />
            </div>
            <div class="sm:col-span-2">
              <div class="flex justify-between">
                <label for="description">Kuvaus</label>
                <span class="ml-auto text-gray-500">Ei pakollinen</span>
              </div>
              <textarea
                name="description"
                value={props.event?.description || ''}
                id="description"
                rows="3"
                class="mt-1 w-full rounded-md border-gray-300 text-sm shadow-sm"
              />
            </div>
          </div>
        </fieldset>
        <fieldset>
          <button
            type="submit"
            class="w-full rounded-md bg-blue-700 py-2 px-4 font-medium text-white shadow-sm hover:bg-blue-800 sm:w-1/2"
          >
            Tallenna
          </button>
        </fieldset>
      </form>
    </>
  );
};

export default EventForm;
