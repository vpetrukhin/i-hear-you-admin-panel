import { LoginForm } from "@/features/auth";
import { useLoginMutation } from "@/features/auth/lib/useLoginMutation";
import { Box, Container } from "@mui/material";
import { useNavigate } from "react-router";

export const LoginPage = () => {
  const loginMutation = useLoginMutation();
  const navigate = useNavigate();

  const handleLogin = async (
    credentials: { email: string; password: string },
  ) => {
    await loginMutation.mutateAsync(credentials);

    console.log("navigate");

    navigate("/");
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

      <LoginForm isLoading={loginMutation.isPending} onSubmit={handleLogin} />
    </Container>
  );
};
