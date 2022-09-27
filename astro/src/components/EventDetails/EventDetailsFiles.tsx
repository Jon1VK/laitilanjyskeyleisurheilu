import { useAuth } from '@auth';
import { FaSolidFileLines, FaSolidLink } from 'solid-icons/fa';
import { HiOutlineTrash } from 'solid-icons/hi';
import { Show } from 'solid-js';
import { useEventDetailsModifier } from './EventDetailsModifier';

const EventDetailsFiles = () => {
  const { isAdmin } = useAuth();
  const {
    event,
    uploadTimetable,
    deleteTimetable,
    uploadResults,
    deleteResults,
  } = useEventDetailsModifier();
  return (
    <Show when={event().type === 'COMPETITION'}>
      <div class="prose prose-blue mt-3 flex flex-col gap-2">
        <Show when={event().externalUrl}>
          <a
            class="flex items-center gap-1"
            target="_blank"
            href={event().externalUrl as string}
          >
            <FaSolidLink />
            Kilpailukalenteri
          </a>
        </Show>
        <Show when={event().timetableFileKey}>
          <div class="flex w-36 items-center justify-between">
            <a
              class="flex items-center gap-1"
              target="_blank"
              download
              href={`${
                import.meta.env.PUBLIC_SUPABASE_URL
              }/storage/v1/object/public/${event().timetableFileKey as string}`}
            >
              <FaSolidFileLines />
              Aikataulu
            </a>
            <Show when={isAdmin()}>
              <button
                onClick={deleteTimetable}
                class="rounded-md border border-gray-300 bg-white p-2 font-semibold text-gray-700 shadow-sm hover:bg-red-600 hover:text-white focus:bg-red-600 focus:text-white"
              >
                <HiOutlineTrash class="h-4 w-4" />
                <span class="sr-only">Poista aikataulu</span>
              </button>
            </Show>
          </div>
        </Show>
        <Show when={isAdmin() && !event().timetableFileKey}>
          <div class="flex flex-col gap-1 text-base text-gray-600">
            <label for="timetable">Lisää aikataulu</label>
            <input
              type="file"
              onChange={(event) => {
                const file = event.currentTarget.files?.[0];
                if (file) void uploadTimetable(file);
              }}
              id="timetable"
              class="cursor-pointer rounded-md border border-gray-300 text-sm shadow-sm file:mr-3 file:cursor-pointer file:border-0 file:bg-gray-200 file:py-2 file:px-4 file:font-medium file:hover:bg-gray-300"
            />
          </div>
        </Show>
        <Show when={event().resultsFileKey}>
          <div class="flex w-36 items-center justify-between">
            <a
              class="flex items-center gap-1"
              target="_blank"
              download
              href={`${
                import.meta.env.PUBLIC_SUPABASE_URL
              }/storage/v1/object/public/${event().resultsFileKey as string}`}
            >
              <FaSolidFileLines />
              Tulokset
            </a>
            <Show when={isAdmin()}>
              <button
                onClick={deleteResults}
                class="rounded-md border border-gray-300 bg-white p-2 font-semibold text-gray-700 shadow-sm hover:bg-red-600 hover:text-white focus:bg-red-600 focus:text-white"
              >
                <HiOutlineTrash class="h-4 w-4" />
                <span class="sr-only">Poista tulokset</span>
              </button>
            </Show>
          </div>
        </Show>
        <Show when={isAdmin() && !event().resultsFileKey}>
          <div class="flex flex-col gap-1 text-base text-gray-600">
            <label for="results">Lisää tulokset</label>
            <input
              type="file"
              onChange={(event) => {
                const file = event.currentTarget.files?.[0];
                if (file) void uploadResults(file);
              }}
              id="results"
              class="cursor-pointer rounded-md border border-gray-300 text-sm shadow-sm file:mr-3 file:cursor-pointer file:border-0 file:bg-gray-200 file:py-2 file:px-4 file:font-medium file:hover:bg-gray-300"
            />
          </div>
        </Show>
      </div>
    </Show>
  );
};

export default EventDetailsFiles;
