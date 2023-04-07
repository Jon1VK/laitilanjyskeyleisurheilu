import { router } from "@trpc/server";
import type { Context } from "./createContext";

const createRouter = () => router<Context>();

export default createRouter;
