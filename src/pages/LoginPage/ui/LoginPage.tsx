import { LoginForm } from "@/features/auth";
import { Box, Container } from "@mui/material";

export const LoginPage = () => {
  const handleLogin = (credentials: { email: string; password: string }) => {
    console.log("Авторизация:", credentials);
    // Здесь можно вызвать API или перейти на другую страницу
  };

  return (
    <Container
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ mb: 4 }}>
        {/* <img src="/logo.png" alt="Логотип" style={{ maxHeight: 80 }} /> */}
        Я тебя слышу
      </Box>

      <LoginForm onSubmit={handleLogin} />
    </Container>
  );
};
