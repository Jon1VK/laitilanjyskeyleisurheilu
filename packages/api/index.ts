import { type AppRouter } from "./src/router";
import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";

export { requestHandler } from "./src/request-handler";
export { api } from "./src/client";

/**
 * Inference helpers for input types
 * @example type HelloInput = RouterInputs['example']['hello']
 **/
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helpers for output types
 * @example type HelloOutput = RouterOutputs['example']['hello']
 **/
export type RouterOutputs = inferRouterOutputs<AppRouter>;
