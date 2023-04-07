import type { PressRelease } from "@prisma/client";
import { HiSolidPencilAlt } from "solid-icons/hi";

type SubmitHandler = (
  event: Event & { currentTarget: HTMLFormElement }
) => void;

const PressReleaseForm = (props: {
  pressRelease: PressRelease;
  onSubmit: (formData: FormData) => void;
}) => {
  const handleSubmit: SubmitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    props.onSubmit(formData);
  };
  return (
    <>
      <h3 class="mb-3 flex items-center gap-2 text-lg font-medium leading-6 text-gray-900">
        <HiSolidPencilAlt class="h-5 w-5" /> Muokkaa tiedotetta
      </h3>
      <form onSubmit={handleSubmit} class="space-y-3 text-sm">
        <div>
          <label for="sendDate">Lähetyspäivä</label>
          <input
            type="date"
            value={props.pressRelease.sendDate.toLocaleDateString("sv") || ""}
            name="sendDate"
            id="sendDate"
            class="mt-1 w-full rounded-md border-gray-300 text-sm shadow-sm"
          />
        </div>
        <div>
          <label for="newsBody">Lehtitiedote</label>
          <textarea
            name="newsBody"
            id="newsBody"
            rows={10}
            class="mt-1 w-full rounded-md border-gray-300 text-sm shadow-sm"
          >
            {props.pressRelease.newsBody}
          </textarea>
        </div>
        <div>
          <label for="whatsappBody">WhatsApp-tiedote</label>
          <textarea
            name="whatsappBody"
            id="whatsappBody"
            rows={10}
            class="mt-1 w-full rounded-md border-gray-300 text-sm shadow-sm"
          >
            {props.pressRelease.whatsappBody}
          </textarea>
        </div>
        <button
          type="submit"
          class="w-full rounded-md bg-blue-700 px-4 py-2 font-medium text-white shadow-sm hover:bg-blue-800 sm:w-1/2"
        >
          Tallenna
        </button>
      </form>
    </>
  );
};

export default PressReleaseForm;
