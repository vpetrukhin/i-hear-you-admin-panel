import type { RequestHandler, WebSocketHandler } from "msw";

export type Handlers = Array<RequestHandler | WebSocketHandler>

export async function enableMocking(handlers: Handlers) {
  if (!import.meta.env.DEV) {
    return;
  }

  const { workerFabric } = await import("./browser");

  const worker = workerFabric(handlers)

  return worker.start();
}
