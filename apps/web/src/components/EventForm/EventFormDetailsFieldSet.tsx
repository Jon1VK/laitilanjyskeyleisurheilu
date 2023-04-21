import RichTextEditor from "../RichTextEditor";
import type { RouterOutputs } from "@laitjy/api";
import { api } from "@laitjy/api";
import type { Event } from "@laitjy/db";
import { HiSolidDownload } from "solid-icons/hi";
import type { Setter } from "solid-js";
import { Show, createSignal } from "solid-js";

const EventFormDetailsFieldSet = (props: {
  event?: Event;
  competition?: RouterOutputs["event"]["fetchCompetitionData"];
  setCompetition: Setter<RouterOutputs["event"]["fetchCompetitionData"]>;
  updateMany?: boolean;
  isCompetition?: boolean;
  isRecurring: boolean;
}) => {
  const [description, setDescription] = createSignal("");
  let competionUrlInput: HTMLInputElement | undefined;
  const handleCompetitionFetch = async () => {
    const url = competionUrlInput?.value || "";
    const competion = await api.event.fetchCompetitionData.query({ url });
    props.setCompetition(competion || "Not found");
  };
  const competitionStartDate = () => {
    const startDay = props.competition?.startDay;
    const startMonth = props.competition?.startMonth;
    const startTime = props.competition?.startTime;
    if (!startDay || !startMonth || !startTime) return "";
    const currYear = new Date().getFullYear();
    const startDate = new Date(
      `${startMonth}-${startDay}-${currYear} ${startTime}`
    );
    return startDate.toLocaleString("sv");
  };
  return (
    <fieldset>
      <legend class="mb-3 text-base font-medium text-gray-700">
        Tapahtuman tiedot
      </legend>
      <div class="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
        <Show
          when={props.isCompetition && !props.updateMany && !props.isRecurring}
        >
          <div class="sm:col-span-2">
            <label for="externalUrl">Kilpailukalenteri</label>
            <div class="relative mt-1">
              <input
                type="text"
                ref={competionUrlInput}
                value={props.event?.externalUrl || ""}
                name="externalUrl"
                placeholder="https://www.kilpailukalenteri.fi/?cs=16&nid=30297"
                id="externalUrl"
                class="w-full rounded-md border-gray-300 text-sm shadow-sm"
              />
              <button
                type="button"
                onClick={handleCompetitionFetch}
                class="absolute inset-y-0 right-0 rounded-r-md bg-blue-700 px-2 text-white hover:bg-blue-800"
              >
                <HiSolidDownload class="h-5 w-5" />
              </button>
            </div>
          </div>
        </Show>
        <div class="sm:col-span-2">
          <div class="flex justify-between">
            <label for="title">Otsikko</label>
            <span class="ml-auto text-gray-500">Pakollinen</span>
          </div>
          <input
            required
            type="text"
            value={props.competition?.title || props.event?.title || ""}
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
              value={
                competitionStartDate() ||
                props.event?.startDateTime.toLocaleString("sv") ||
                ""
              }
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
            value={props.competition?.location || props.event?.location || ""}
            name="location"
            id="location"
            class="mt-1 w-full rounded-md border-gray-300 text-sm shadow-sm"
          />
        </div>
        <div class="sm:col-span-2">
          <label>Kuvaus</label>
          <input type="hidden" name="description" value={description()} />
          <div class="mt-1 w-full">
            <RichTextEditor
              initialHTML={
                props.competition?.description || props.event?.description || ""
              }
              onChange={setDescription}
            />
          </div>
        </div>
      </div>
    </fieldset>
  );
};

export default EventFormDetailsFieldSet;
