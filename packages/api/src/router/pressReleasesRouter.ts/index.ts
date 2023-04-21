import { createRouter } from "../../trpc";
import { deletePressRelease } from "./delete";
import { updatePressRelease } from "./update";

export const pressReleasesRouter = createRouter({
  update: updatePressRelease,
  delete: deletePressRelease,
});
