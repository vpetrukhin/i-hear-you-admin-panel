import { AuthProvider } from "@/features/auth";
import { RouterProvider } from "react-router/dom";
import { CssBaseline } from "@mui/material";
import { router } from "./router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/shared/api/queryClient";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CssBaseline />

        <RouterProvider router={router} />,
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
