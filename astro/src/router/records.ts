import { recordsController } from "@controllers";
import createRouter from "@lib/createRouter";

const recordsRouter = createRouter().mutation(
  "createRecord",
  recordsController.create
);

export default recordsRouter;
