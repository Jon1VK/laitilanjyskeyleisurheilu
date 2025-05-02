import { HiOutlinePencilSquare } from "solid-icons/hi";
import { Show, createSignal } from "solid-js";
import { useAuth } from "~/auth";
import logger from "~/utils/logger";
import Modal from "../Modal";
import NewsForm from "../NewsForm";
import { useNewsDetailsModifier } from "./NewsDetailsModifier";

const NewsDetailsInner = () => {
  const { isAdmin } = useAuth();
  const {
    newsArticle,
    updateNewsArticle,
    deleteNewsArticle: _deleteNewsArticle,
  } = useNewsDetailsModifier();
  const [showForm, setShowForm] = createSignal(false);
  const handleFormSubmit = async (formData: FormData) => {
    try {
      await updateNewsArticle(formData);
      setShowForm(false);
    } catch (error) {
      await logger.error(error as Error);
      alert(
        "Tietojen päivittäminen ei onnistunut. Yritä uudelleen, tai kopioi muutoksesi talteen ja lataa sivu uudelleen."
      );
    }
  };
  return (
    <>
      <header class="mx-auto max-w-prose text-center text-lg">
        <h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          {newsArticle().title}
        </h1>
        <Show when={isAdmin()}>
          <div class="my-3 flex justify-center gap-1">
            <button
              onClick={() => setShowForm(true)}
              class="rounded-md border border-gray-300 bg-white p-2 font-semibold text-gray-700 shadow-sm hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white"
            >
              <HiOutlinePencilSquare class="h-5 w-5" />
              <span class="sr-only">Muokkaa uutista {newsArticle().title}</span>
            </button>
            {/* <button
              onClick={() => deleteNewsArticle()}
              class="rounded-md border border-gray-300 bg-white p-2 font-semibold text-gray-700 shadow-sm hover:bg-red-600 hover:text-white focus:bg-red-600 focus:text-white"
            >
              <HiOutlineTrash class="h-5 w-5" />
              <span class="sr-only">Poista uutinen {newsArticle().title}</span>
            </button> */}
          </div>
        </Show>
        <div class="mt-3 text-lg text-gray-500 sm:mt-4 sm:text-xl">
          <span class="font-medium text-blue-600">{newsArticle().author}</span>
          <span aria-hidden="true"> &middot;</span>
          <time datetime={newsArticle().publishedAt.toLocaleDateString("sv")}>
            {newsArticle().publishedAt.toLocaleDateString("fi", {
              dateStyle: "full",
            })}
          </time>
        </div>
        <p class="mt-8 text-lg leading-8 text-gray-600 sm:text-xl">
          {newsArticle().leadParagraph}
        </p>
      </header>
      <div
        // eslint-disable-next-line solid/no-innerhtml
        innerHTML={newsArticle().body}
        class="prose prose-blue mx-auto mt-6 text-lg text-gray-600"
      />
      <Show when={showForm()}>
        <Modal close={() => setShowForm(false)}>
          <NewsForm
            onSubmit={handleFormSubmit}
            newsArticle={newsArticle()}
            update
          />
        </Modal>
      </Show>
    </>
  );
};

export default NewsDetailsInner;
