import { AuthProvider } from "@/features/auth";
import { RouterProvider } from "react-router/dom";
import { CssBaseline } from "@mui/material";
import { router } from "./router";

function App() {
  return (
    <AuthProvider>
      <CssBaseline />

      <RouterProvider router={router} />,
    </AuthProvider>
  );
}

export default App;
