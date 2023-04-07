import { emailsController } from "@controllers";
import createRouter from "@lib/createRouter";

const emailsRouter = createRouter().mutation(
  "sendContactEmail",
  emailsController.sendContactEmail
);

export default emailsRouter;
