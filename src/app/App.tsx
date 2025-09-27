import { AuthProvider } from "@/features/auth";
import { LoginPage } from "@/pages/LoginPage";
import { CssBaseline } from "@mui/material";

function App() {
  return (
    <AuthProvider>
      <CssBaseline />

      <LoginPage />
    </AuthProvider>
  );
}

export default App;
