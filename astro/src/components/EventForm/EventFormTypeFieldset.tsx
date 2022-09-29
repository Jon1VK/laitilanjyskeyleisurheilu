import type { EventType } from '@prisma/client';
import { For, Setter } from 'solid-js';

const eventTypes = {
  PRACTICE: {
    title: 'Harjoitus',
    value: 'PRACTICE',
  },
  COMPETITION: {
    title: 'Kilpailu',
    value: 'COMPETITION',
  },
  OTHER: {
    title: 'Muu tapahtuma',
    value: 'OTHER',
  },
};

const EventFormTypeFieldset = (props: {
  eventType: EventType;
  setEventType: Setter<EventType>;
}) => {
  return (
    <fieldset>
      <div class="flex flex-col gap-3 font-medium text-gray-700 sm:flex-row sm:gap-6">
        <For each={Object.values(eventTypes)}>
          {({ title, value }) => (
            <div class="flex items-center">
              <input
                id={value}
                required
                checked={value === props.eventType}
                onChange={(event) =>
                  props.setEventType(event.currentTarget.value as EventType)
                }
                name="type"
                value={value}
                type="radio"
                class="border-gray-300"
              />
              <label for={value} class="pl-3">
                {title}
              </label>
            </div>
          )}
        </For>
      </div>
    </fieldset>
  );
};

export default EventFormTypeFieldset;
