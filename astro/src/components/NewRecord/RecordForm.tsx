import {
  EVENTS_BY_LEAGUE,
  GENDERS,
  League,
  LEAGUES_BY_GENDER,
} from "@utils/records";
import { createSignal, For } from "solid-js";

type SubmitHandler = (
  event: Event & { currentTarget: HTMLFormElement }
) => void;

const RecordForm = (props: { onSubmit: (formData: FormData) => void }) => {
  const [selectedLeague, setSelectedLeague] = createSignal<League>("Miehet");
  const handleSubmit: SubmitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    props.onSubmit(formData);
  };
  return (
    <>
      <header class="text-gray-600">
        <h3 class="mb-4 text-lg font-medium leading-6 text-gray-900">
          Ilmoita uusi ennätys
        </h3>
        <p class="mb-6">
          Ilmoita uusi ennätys tai TOP10-tulos alla olevan lomakkeen avulla.
          Ennätyksen tiedot tarkastetaan ennen kuin se lisätään listoille.
        </p>
      </header>
      <form onSubmit={handleSubmit} class="space-y-6 text-sm">
        <fieldset>
          <legend class="mb-3 text-base font-medium text-gray-700">
            Urheilijan tiedot
          </legend>
          <div class="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-3">
            <div>
              <label for="league">Sarja</label>
              <select
                required
                value={selectedLeague()}
                onChange={(event) =>
                  setSelectedLeague(event.currentTarget.value as League)
                }
                name="league"
                id="league"
                class="mt-1 w-full rounded-md border-gray-300 text-sm shadow-sm"
              >
                <For each={GENDERS}>
                  {(gender) => (
                    <optgroup label={gender}>
                      <For each={LEAGUES_BY_GENDER[gender]}>
                        {(league) => <option value={league}>{league}</option>}
                      </For>
                    </optgroup>
                  )}
                </For>
              </select>
            </div>
            <div class="sm:col-span-2">
              <label for="athlete">Nimi</label>
              <input
                required
                type="text"
                name="athlete"
                id="athlete"
                class="mt-1 w-full rounded-md border-gray-300 text-sm shadow-sm"
              />
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend class="mb-3 text-base font-medium text-gray-700">
            Kilpailun tiedot
          </legend>
          <div class="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <label for="event">Laji</label>
              <select
                required
                name="event"
                id="event"
                class="mt-1 w-full rounded-md border-gray-300 text-sm shadow-sm"
              >
                <For each={EVENTS_BY_LEAGUE[selectedLeague()]}>
                  {(event) => <option value={event}>{event}</option>}
                </For>
              </select>
            </div>
            <div class="sm:col-span-3">
              <label for="result">Tulos</label>
              <input
                required
                type="text"
                name="result"
                id="result"
                class="mt-1 w-full rounded-md border-gray-300 text-sm shadow-sm"
              />
            </div>
            <div class="sm:col-span-2">
              <label for="achievedAt">Päivämäärä</label>
              <input
                required
                type="date"
                name="achievedAt"
                id="achievedAt"
                class="mt-1 w-full rounded-md border-gray-300 text-sm shadow-sm"
              />
            </div>
            <div class="sm:col-span-4">
              <label for="location">Paikkakunta</label>
              <input
                required
                type="text"
                name="location"
                id="location"
                class="mt-1 w-full rounded-md border-gray-300 text-sm shadow-sm"
              />
            </div>
          </div>
        </fieldset>
        <fieldset>
          <button
            type="submit"
            class="mt-4 w-full rounded-md bg-blue-700 px-4 py-2 font-medium text-white shadow-sm hover:bg-blue-800 sm:w-1/2"
          >
            Lähetä
          </button>
        </fieldset>
      </form>
    </>
  );
};

export default RecordForm;
