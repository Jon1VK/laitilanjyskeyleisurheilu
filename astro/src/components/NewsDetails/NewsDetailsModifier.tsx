import type { News } from "@prisma/client";
import {
  Context,
  ParentComponent,
  createContext,
  createSignal,
  useContext,
} from "solid-js";
import { api } from "~/services/api";

const createNewsDetailsModifier = (initialNewsArticle: News) => {
  const [newsArticle, setNewsArticle] = createSignal(initialNewsArticle);

  const deleteNewsArticle = async () => {
    await api.news.delete.mutate({ id: newsArticle().id });
    window.location.href = "/uutiset#main";
  };

  const updateNewsArticle = async (formData: FormData) => {
    const draft = Boolean(formData.get("draft"));
    const author = formData.get("author") as string;
    const publishedAt = new Date(formData.get("publishedAt") as string);
    const cardImage = (formData.get("cardImage") as string) || null;
    const title = formData.get("title") as string;
    const leadParagraph = formData.get("leadParagraph") as string;
    const body = formData.get("body") as string;
    const updatedNewsArticle = await api.news.update.mutate({
      id: newsArticle().id,
      update: {
        ...newsArticle(),
        draft,
        author,
        publishedAt,
        cardImage,
        title,
        leadParagraph,
        body,
      },
    });
    setNewsArticle(updatedNewsArticle);
  };

  return {
    newsArticle,
    updateNewsArticle,
    deleteNewsArticle,
  };
};

type NewsDetailsModifier = ReturnType<typeof createNewsDetailsModifier>;

const NewsDetailsModifierContext =
  createContext() as Context<NewsDetailsModifier>;

const NewsDetailsModifierProvider: ParentComponent<{
  initialNewsArticle: News;
}> = (props) => {
  const newsDetailsModifier = () =>
    createNewsDetailsModifier(props.initialNewsArticle);
  return (
    <NewsDetailsModifierContext.Provider value={newsDetailsModifier()}>
      {props.children}
    </NewsDetailsModifierContext.Provider>
  );
};

export default NewsDetailsModifierProvider;

export const useNewsDetailsModifier = () =>
  useContext(NewsDetailsModifierContext);
