import { setupWorker } from "msw/browser";
import type { Handlers } from ".";
// import { handlers } from "./handlers";

export const workerFabric = (handlers: Handlers) => setupWorker(...handlers);
