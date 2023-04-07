import { createSignal } from "solid-js";
import { useAuth } from "~/auth";
import logger from "~/utils/logger";
import uploadImage from "~/utils/uploadImage";
import RichTextEditor from "../RichTextEditor";

type SubmitHandler = (
  event: Event & { currentTarget: HTMLFormElement }
) => Promise<void>;

const NewsForm = (props: { onSubmit: (formData: FormData) => void }) => {
  const { user } = useAuth();
  const [isDraft, _setIsDraft] = createSignal(false);
  const [image, setImage] = createSignal<File>();
  const [body, setBody] = createSignal("");
  const handleSubmit: SubmitHandler = async (event) => {
    try {
      event.preventDefault();
      const form = event.currentTarget;
      const formData = new FormData(form);
      formData.set("body", body());
      if (isDraft()) formData.set("draft", "on");
      if (image()) {
        const src = await uploadImage(image() as File);
        formData.set("cardImage", src);
      }
      props.onSubmit(formData);
    } catch (error) {
      await logger.error(error as Error);
      alert(
        "Uutisen luominen ei onnistunut. Yritä uudelleen, tai kopioi täyttämäsi kentät talteen ja lataa sivu uudelleen."
      );
    }
  };
  return (
    <div class="text-left">
      <header class="text-gray-600">
        <h3 class="mb-4 text-lg font-medium leading-6 text-gray-900">
          Luo uusi uutinen
        </h3>
      </header>
      <form onSubmit={handleSubmit} class="space-y-6 text-sm">
        <div class="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
          <div>
            <label for="author">Kirjoittaja</label>
            <input
              required
              type="text"
              name="author"
              value={user().name}
              id="author"
              class="mt-1 w-full rounded-md border-gray-300 text-sm shadow-sm"
            />
          </div>
          <div>
            <label for="publishedAt">Päivämäärä</label>
            <input
              required
              type="date"
              name="publishedAt"
              value={new Date().toLocaleDateString("sv")}
              id="publishedAt"
              class="mt-1 w-full rounded-md border-gray-300 text-sm shadow-sm"
            />
          </div>
          <div class="sm:col-span-2">
            <div class="flex justify-between">
              <label for="cardImage">Pääkuva</label>
              <span class="ml-auto text-gray-500">Valinnainen</span>
            </div>
            <input
              type="file"
              id="cardImage"
              onChange={(event) => {
                const image = event.currentTarget.files?.[0];
                if (image) setImage(() => image);
              }}
              class="mt-1 w-full cursor-pointer rounded-md border border-gray-300 text-sm shadow-sm file:mr-3 file:cursor-pointer file:border-0 file:bg-gray-200 file:px-4 file:py-2 file:font-medium file:hover:bg-gray-300 focus:outline-blue-600"
            />
          </div>
          <div class="sm:col-span-2">
            <label for="title">Otsikko</label>
            <input
              required
              type="text"
              name="title"
              id="title"
              class="mt-1 w-full rounded-md border-gray-300 text-sm shadow-sm"
            />
          </div>
          <div class="sm:col-span-2">
            <label for="leadParagraph">Ingressi</label>
            <textarea
              required
              name="leadParagraph"
              id="leadParagraph"
              rows={4}
              class="mt-1 w-full rounded-md border-gray-300 text-sm shadow-sm"
            />
          </div>
          <div class="sm:col-span-2">
            <label>Teksti</label>
            <div class="mt-1 w-full">
              <RichTextEditor onChange={setBody} />
            </div>
          </div>
          <div class="sm:col-span-2">
            <button
              type="submit"
              class="mt-4 w-full rounded-md bg-blue-700 px-4 py-2 font-medium text-white shadow-sm hover:bg-blue-800"
            >
              Julkaise
            </button>
          </div>
          {/* <div>
            <button
              type="submit"
              onClick={() => setIsDraft(true)}
              class="mt-4 w-full rounded-md bg-gray-100 px-4 py-2 font-medium ring-1 ring-black/10 hover:bg-gray-200"
            >
              Tallenna luonnoksena
            </button>
          </div> */}
        </div>
      </form>
    </div>
  );
};

export default NewsForm;
