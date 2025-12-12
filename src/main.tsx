import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app/App.tsx";
import { enableMocking, type Handlers } from "./shared/lib/mocks";
import { authHandlers } from "./features/auth";
import { getCategoriesHandlers, getMaterialHandlers, getTopicHandlers } from "./entities/Materials";
import { getPathHandlers } from "./pages/BotSettingsPage";
import { getBotMessageApiHandlers } from "./shared/api/bomessagesApi";

const handlers: Handlers = [
  ...authHandlers,
  ...getMaterialHandlers(),
  ...getCategoriesHandlers(),
  ...getTopicHandlers(),
  ...getPathHandlers(),
  ...getBotMessageApiHandlers(),
]

enableMocking(handlers).then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
