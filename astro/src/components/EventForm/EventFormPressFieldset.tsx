import type { Event } from '@prisma/client';
import { getDayCountBetween } from '@utils/dates';
import { createSignal, Show, splitProps } from 'solid-js';

const EventFormPressFieldset = (props: {
  event?: Event;
  updateMany?: boolean;
}) => {
  const [{ event }, _] = splitProps(props, ['event']);
  const initialPressStartBefore = () => {
    return event
      ? getDayCountBetween(event.pressStartDate, event.startDateTime).toString()
      : '10';
  };
  const initialPressEndBefore = () => {
    return event
      ? getDayCountBetween(event.pressEndDate, event.startDateTime).toString()
      : '1';
  };
  const [pressStartBefore, setPressStartBefore] = createSignal(
    initialPressStartBefore()
  );
  const [pressEndBefore, setPressEndBefore] = createSignal(
    initialPressEndBefore()
  );
  return (
    <fieldset>
      <legend class="mb-3 text-base font-medium text-gray-700">
        Tiedote asetukset
      </legend>
      <div class="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
        <Show when={!props.updateMany}>
          <div>
            <label for="pressStartBefore">Lähetys aloitetaan</label>
            <input
              type="range"
              value={pressStartBefore()}
              name="pressStartBefore"
              id="pressStartBefore"
              onInput={(event) =>
                setPressStartBefore(event.currentTarget.value)
              }
              min={7}
              max={21}
              dir="rtl"
              class="mt-1 w-full rounded-md border-gray-300 text-sm shadow-sm"
            />
            <span class="col-span-3 text-sm">
              {pressStartBefore()} päivää ennen tapahtumaa
            </span>
          </div>
          <div>
            <label for="pressEndBefore">Lähetys lopetetaan</label>
            <input
              type="range"
              value={pressEndBefore()}
              name="pressEndBefore"
              id="pressEndBefore"
              onInput={(event) => setPressEndBefore(event.currentTarget.value)}
              min={1}
              max={14}
              dir="rtl"
              class="mt-1 w-full rounded-md border-gray-300 text-sm accent-red-600 shadow-sm"
            />
            <span class="col-span-3 text-sm">
              {pressEndBefore()} päivä{pressEndBefore() === '1' ? '' : 'ä'}{' '}
              ennen tapahtumaa
            </span>
          </div>
        </Show>
        <div class="sm:col-span-2">
          <label for="pressBody">Kuvaus tekstinä</label>
          <div class="mt-1 w-full">
            <textarea
              name="pressBody"
              id="pressBody"
              rows={5}
              class="mt-1 w-full rounded-md border-gray-300 text-sm shadow-sm"
            >
              {props.event?.pressBody || ''}
            </textarea>
          </div>
        </div>
      </div>
    </fieldset>
  );
};

export default EventFormPressFieldset;
