import { EventType } from '@prisma/client';
import { For, JSX } from 'solid-js';

const eventTypeTitles: Record<EventType, string> = {
  PRACTICE: 'Harjoitus',
  COMPETITION: 'Kilpailu',
  OTHER: 'Muu',
};

const toTitle = (eventType: EventType) => eventTypeTitles[eventType];

type SubmitHandler = JSX.DOMAttributes<HTMLFormElement>['onSubmit'];

const EventForm = (props: { onSubmit: (formData: FormData) => void }) => {
  const handleSubmit: SubmitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    props.onSubmit(formData);
  };
  return (
    <>
      <h3 class="mb-4 text-lg font-medium leading-6 text-gray-900">
        Luo uusi tapahtuma
      </h3>
      <form onSubmit={handleSubmit} class="space-y-6 text-sm">
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
                    {toTitle(eventType)}
                  </label>
                </div>
              )}
            </For>
          </div>
        </fieldset>
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label for="startDateTime" class="font-medium text-gray-700">
              Alkamisaika
            </label>
            <input
              required
              type="datetime-local"
              name="startDateTime"
              id="startDateTime"
              class="mt-1 w-full rounded-md border-gray-300 text-sm shadow-sm"
            />
          </div>
          <div>
            <div class="flex justify-between">
              <label for="endDateTime" class="font-medium text-gray-700">
                Loppumisaika
              </label>
              <span class="ml-auto text-gray-500">Ei pakollinen</span>
            </div>
            <input
              type="datetime-local"
              name="endDateTime"
              id="endDateTime"
              class="mt-1 w-full rounded-md border-gray-300 text-sm shadow-sm"
            />
          </div>
          <div class="sm:col-span-2">
            <label for="title" class="font-medium text-gray-700">
              Otsikko
            </label>
            <input
              required
              type="text"
              name="title"
              id="title"
              class="mt-1 w-full rounded-md border-gray-300 text-sm shadow-sm"
            />
          </div>
          <div class="sm:col-span-2">
            <div class="flex justify-between">
              <label for="location" class="font-medium text-gray-700">
                Paikka
              </label>
              <span class="ml-auto text-gray-500">Ei pakollinen</span>
            </div>
            <input
              type="text"
              name="location"
              id="location"
              class="mt-1 w-full rounded-md border-gray-300 text-sm shadow-sm"
            />
          </div>
          <div class="sm:col-span-2">
            <div class="flex justify-between">
              <label for="description" class="font-medium text-gray-700">
                Kuvaus
              </label>
              <span class="ml-auto text-gray-500">Ei pakollinen</span>
            </div>
            <textarea
              name="description"
              id="description"
              rows="3"
              class="mt-1 w-full rounded-md border-gray-300 text-sm shadow-sm"
            />
          </div>
          <button
            type="submit"
            class="rounded-md bg-blue-700 py-2 px-4 font-medium text-white shadow-sm hover:bg-blue-800"
          >
            Tallenna
          </button>
        </div>
      </form>
    </>
  );
};

export default EventForm;
