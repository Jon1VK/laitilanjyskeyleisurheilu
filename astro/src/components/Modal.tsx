import { HiSolidX } from 'solid-icons/hi';
import type { ParentComponent } from 'solid-js';

const Modal: ParentComponent<{ close: () => void }> = (props) => (
  <div class="relative z-50">
    <div
      role="button"
      tabIndex={-1}
      onKeyPress={(event) =>
        event.target === event.currentTarget &&
        event.key === 'Enter' &&
        props.close()
      }
      onClick={(event) => event.target === event.currentTarget && props.close()}
      class="fixed inset-0 flex cursor-default items-start justify-center overflow-y-auto bg-gray-500/75 transition-opacity"
    >
      <div
        tabIndex={-1}
        class="relative m-4 w-full cursor-default rounded-lg bg-white p-4 shadow-xl transition-all sm:max-w-lg sm:p-6 md:max-w-2xl"
      >
        <button
          onClick={() => props.close()}
          class="absolute top-0 right-0 m-2 rounded-md bg-white p-2 text-gray-400 hover:text-gray-500"
        >
          <span class="sr-only">Close</span>
          <HiSolidX class="h-6 w-6" />
        </button>
        <div>{props.children}</div>
      </div>
    </div>
  </div>
);

export default Modal;