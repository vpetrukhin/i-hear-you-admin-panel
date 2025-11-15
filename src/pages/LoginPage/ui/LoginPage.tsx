import { theme } from "@/app/theme";
import { LoginForm, useAuthContext } from "@/features/auth";
import { useLoginMutation } from "@/features/auth/lib/useLoginMutation";
import { MATERIAL_LIST_PAGE_ROUTE } from "@/pages/MaterialListPage";
import { Box, Container } from "@mui/material";
import { Navigate, useNavigate } from "react-router";

export const LoginPage = () => {
  const loginMutation = useLoginMutation();
  const navigate = useNavigate();

  const { isAuth, login } = useAuthContext();

  const handleLogin = async (credentials: {
    email: string;
    password: string;
  }) => {
    // await loginMutation.mutateAsync(credentials);
    await login(credentials)

    navigate(MATERIAL_LIST_PAGE_ROUTE);
  };

  if (isAuth) {
    return <Navigate to={MATERIAL_LIST_PAGE_ROUTE} />;
  }

  return (
    <Box sx={{ maxHeight: "100vh", overflow: "hidden" }}>
      <Container
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "80%",
          position: "relative",
          [theme.breakpoints.up("md")]: {
            width: "49.17%",
          },
        }}
      >
        <Box
          component="img"
          src="/images/login-bg.png"
          alt="Логотип"
          sx={{
            position: "absolute",
            top: "50%",
            left: "0%",
            transform: "translateY(-50%)",
            width: "100%",
            height: "auto",
            objectFit: "contain",
            zIndex: 1,
            minWidth: "200px",
            [theme.breakpoints.up("md")]: {
              minWidth: "600px",
              left: "-5%",
            },
          }}
        />
        <LoginForm
          isLoading={loginMutation.isPending}
          errors={
            loginMutation.isError
              ? {
                common: loginMutation.error.response?.data.detail,
              }
              : undefined
          }
          onSubmit={handleLogin}
        />
      </Container>
    </Box>
  );
};
