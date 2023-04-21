import { createRouter } from "../../trpc";
import { sendContactRequestEmail } from "./sendContactRequest";

export const emailsRouter = createRouter({
  sendContactRequest: sendContactRequestEmail,
});
