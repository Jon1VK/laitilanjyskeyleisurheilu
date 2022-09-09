import { useAuth } from '@auth';
import trpcClient from '@lib/trpcClient';
import type { Event } from '@prisma/client';
import { HiOutlineTrash } from 'solid-icons/hi';
import { Show } from 'solid-js';

const EventsActions = (props: { event: Event }) => {
  const { loggedIn } = useAuth();
  const deleteEvent = async () => {
    await trpcClient.mutation('deleteEvent', props.event.id);
    window.location.href = '/tapahtumat';
  };
  return (
    <Show when={loggedIn()}>
      <div class="my-3 flex gap-1">
        <button
          onClick={() => deleteEvent()}
          class="rounded-md border border-gray-300 bg-white p-2 font-semibold text-gray-700 shadow-sm hover:bg-red-600 hover:text-white focus:bg-red-600 focus:text-white"
        >
          <HiOutlineTrash class="h-5 w-5" />
          <span class="sr-only">Poista {props.event.slug}</span>
        </button>
      </div>
    </Show>
  );
};

export default EventsActions;
