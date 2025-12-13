import type { RequestHandler, WebSocketHandler } from "msw";

export type Handlers = Array<RequestHandler | WebSocketHandler>

export async function enableMocking(handlers: Handlers) {
  if (!import.meta.env.DEV) {
    return;
  }

  if (!import.meta.env.VITE_API_ENABLE_MSW) {
    return
  }

  const { workerFabric } = await import("./browser");

  const worker = workerFabric(handlers)

  return worker.start();
}
