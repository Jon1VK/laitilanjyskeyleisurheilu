import type { Event, EventType } from "@prisma/client";
import { Show, createSignal } from "solid-js";
import RichTextEditor from "../RichTextEditor";

const EventFormDetailsFieldSet = (props: {
  event?: Event;
  updateMany?: boolean;
  eventType: EventType;
  isRecurring: boolean;
}) => {
  const [description, setDescription] = createSignal("");
  return (
    <fieldset>
      <legend class="mb-3 text-base font-medium text-gray-700">
        Tapahtuman tiedot
      </legend>
      <div class="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
        <div class="sm:col-span-2">
          <div class="flex justify-between">
            <label for="title">Otsikko</label>
            <span class="ml-auto text-gray-500">Pakollinen</span>
          </div>
          <input
            required
            type="text"
            value={props.event?.title || ""}
            name="title"
            id="title"
            class="mt-1 w-full rounded-md border-gray-300 text-sm shadow-sm"
          />
        </div>
        <Show when={!props.updateMany}>
          <div>
            <div class="flex justify-between">
              <label for="startDateTime">Alkamisaika</label>
              <span class="ml-auto text-gray-500">Pakollinen</span>
            </div>
            <input
              required
              type={props.isRecurring ? "time" : "datetime-local"}
              value={props.event?.startDateTime.toLocaleString("sv") || ""}
              name="startDateTime"
              id="startDateTime"
              class="mt-1 w-full rounded-md border-gray-300 text-sm shadow-sm"
            />
          </div>
          <div>
            <label for="endDateTime">Loppumisaika</label>
            <input
              type={props.isRecurring ? "time" : "datetime-local"}
              value={props.event?.endDateTime?.toLocaleString("sv") || ""}
              name="endDateTime"
              id="endDateTime"
              class="mt-1 w-full rounded-md border-gray-300 text-sm shadow-sm"
            />
          </div>
        </Show>
        <div class="sm:col-span-2">
          <label for="location">Paikka</label>
          <input
            type="text"
            value={props.event?.location || ""}
            name="location"
            id="location"
            class="mt-1 w-full rounded-md border-gray-300 text-sm shadow-sm"
          />
        </div>
        <Show
          when={
            props.eventType === "COMPETITION" &&
            !props.updateMany &&
            !props.isRecurring
          }
        >
          <div class="sm:col-span-2">
            <label for="externalUrl">Kilpailukalenteri</label>
            <input
              type="text"
              value={props.event?.externalUrl || ""}
              name="externalUrl"
              placeholder="https://www.kilpailukalenteri.fi/?cs=16&nid=30297"
              id="externalUrl"
              class="mt-1 w-full rounded-md border-gray-300 text-sm shadow-sm"
            />
          </div>
        </Show>
        <div class="sm:col-span-2">
          <label>Kuvaus</label>
          <input type="hidden" name="description" value={description()} />
          <div class="mt-1 w-full">
            <RichTextEditor
              initialHTML={props.event?.description || ""}
              onChange={setDescription}
            />
          </div>
        </div>
      </div>
    </fieldset>
  );
};

export default EventFormDetailsFieldSet;
