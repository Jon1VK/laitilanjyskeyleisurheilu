import { For, Setter, Show } from "solid-js";
import { WEEKDAYS } from "~/utils/dates";

const EventFormRecurrenceFieldset = (props: {
  isRecurring: boolean;
  setIsRecurring: Setter<boolean>;
}) => {
  return (
    <fieldset>
      <legend class="mb-3 text-base font-medium text-gray-700">
        Toistuvuus
      </legend>
      <div class="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
        <div class="flex items-center sm:col-span-2">
          <input
            id="isRecurring"
            name="isRecurring"
            checked={props.isRecurring}
            onChange={() => props.setIsRecurring(!props.isRecurring)}
            type="checkbox"
            class="border-gray-300"
          />
          <label for="isRecurring" class="pl-3">
            Viikoittain
          </label>
        </div>
        <Show when={props.isRecurring}>
          <div class="flex gap-3 sm:col-span-2">
            <For each={WEEKDAYS}>
              {(weekday, index) => (
                <div class="flex flex-col items-center">
                  <label for={`weekday-${weekday}`} class="pb-1 capitalize">
                    {weekday.slice(0, 2)}
                    <span class="sr-only">{weekday}</span>
                  </label>
                  <input
                    id={`weekday-${weekday}`}
                    name="weekdays"
                    value={(index() + 1) % 7}
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
  );
};

export default EventFormRecurrenceFieldset;
