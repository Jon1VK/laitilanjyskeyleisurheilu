import { FaSolidFilePen } from "solid-icons/fa";
import { createSignal, Show } from "solid-js";
import { useAuth } from "~/auth";
import { api } from "~/services/api";
import logger from "~/utils/logger";
import Modal from "../Modal";
import NewsForm from "./NewsForm";

const CreateNews = () => {
  const { isAdmin } = useAuth();
  const [showForm, setShowForm] = createSignal(false);
  const handleFormSubmit = async (formData: FormData) => {
    try {
      const createdNews = await api.news.create.mutate({
        draft: Boolean(formData.get("draft")),
        author: formData.get("author") as string,
        publishedAt: new Date(formData.get("publishedAt") as string),
        cardImage: (formData.get("cardImage") as string) || null,
        title: formData.get("title") as string,
        leadParagraph: formData.get("leadParagraph") as string,
        body: formData.get("body") as string,
      });
      window.location.href = `/uutiset/${createdNews.slug}#main`;
    } catch (error) {
      await logger.error(error as Error);
      alert(
        "Uutisen luominen ei onnistunut. Yritä uudelleen, tai kopioi täyttämäsi kentät talteen ja lataa sivu uudelleen."
      );
    }
  };
  return (
    <Show when={isAdmin()}>
      <button
        onClick={() => setShowForm(true)}
        class="rounded-md border border-gray-300 bg-white py-2 pl-2.5 pr-1.5 font-semibold text-gray-700 shadow-sm hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white"
      >
        <FaSolidFilePen class="h-5 w-5" />
        <span class="sr-only">Lisää uusi uutinen</span>
      </button>
      <Show when={showForm()}>
        <Modal close={() => setShowForm(false)}>
          <NewsForm onSubmit={handleFormSubmit} />
        </Modal>
      </Show>
    </Show>
  );
};

export default CreateNews;
