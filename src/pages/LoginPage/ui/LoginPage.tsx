import { LoginForm, useAuthContext } from "@/features/auth";
import { useLoginMutation } from "@/features/auth/lib/useLoginMutation";
import { MATERIAL_LIST_PAGE_ROUTE } from "@/pages/MaterialListPage";
import { Box, Container } from "@mui/material";
import { Navigate, useNavigate } from "react-router";

export const LoginPage = () => {
  const loginMutation = useLoginMutation();
  const navigate = useNavigate();

  const { isAuth } = useAuthContext();

  const handleLogin = async (
    credentials: { email: string; password: string },
  ) => {
    await loginMutation.mutateAsync(credentials);

    navigate(MATERIAL_LIST_PAGE_ROUTE);
  };

  if (isAuth) {
    return <Navigate to={MATERIAL_LIST_PAGE_ROUTE} />;
  }

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

      <LoginForm
        isLoading={loginMutation.isPending}
        errors={loginMutation.isError
          ? {
            common: loginMutation.error.response?.data.detail,
          }
          : undefined}
        onSubmit={handleLogin}
      />
    </Container>
  );
};
