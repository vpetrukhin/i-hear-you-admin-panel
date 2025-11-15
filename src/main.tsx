import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app/App.tsx";
import { enableMocking, type Handlers } from "./shared/lib/mocks";
import { authHandlers } from "./features/auth";
import { getMaterialHandlers } from "./entities/Materials";

const handlers: Handlers = [
  ...authHandlers,
  ...getMaterialHandlers(),
]

enableMocking(handlers).then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
