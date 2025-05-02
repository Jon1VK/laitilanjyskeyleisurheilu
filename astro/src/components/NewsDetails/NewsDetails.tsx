import { News } from "@prisma/client";
import NewsDetailsInner from "./NewsDetailsInner";
import NewsDetailsModifierProvider from "./NewsDetailsModifier";

const EventDetails = (props: { newsArticle: News }) => (
  <NewsDetailsModifierProvider initialNewsArticle={props.newsArticle}>
    <article class="relative px-4 sm:px-6 lg:px-8">
      <NewsDetailsInner />
    </article>
  </NewsDetailsModifierProvider>
);

export default EventDetails;
