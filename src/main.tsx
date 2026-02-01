import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app/App.tsx";
import { enableMocking, type Handlers } from "./shared/lib/mocks";
import { authHandlers } from "./features/auth";
import {
  getCategoriesHandlers,
  getMaterialHandlers,
  getTopicHandlers,
} from "./entities/Materials";
import { getBotMessageApiHandlers } from "./shared/api/bomessagesApi";
import { getPathHandlers } from "./shared/api/pathApi/pathHandlers.ts";

const handlers: Handlers = [
  ...authHandlers,
  ...getMaterialHandlers(),
  ...getCategoriesHandlers(),
  ...getTopicHandlers(),
  ...getPathHandlers(),
  ...getBotMessageApiHandlers(),
];

enableMocking(handlers).then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
