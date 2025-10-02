import { useAuthContext } from "@/features/auth";
import { LOGIN_PAGE_ROUTE } from "@/pages/LoginPage";
import { Box, Button, Stack, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import UploadIcon from "@mui/icons-material/Upload";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router";
import { SidebarLink } from "@/shared/ui/SidebarLink";

export const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuthContext();

  const handleLogout = () => {
    logout();
    navigate(LOGIN_PAGE_ROUTE);
  };

  return (
    <Box
      sx={{
        width: "28%",
        minWidth: 200,
        bgcolor: "#FAF9FD",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        py: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            px: "20px",
            pt: "20px",
            pb: "56px",
            color: "#2B2735",
          }}
        >
          <Typography
            sx={{ fontSize: "20px", lineHeight: "120%", fontWeight: "800" }}
          >
            Я ТЕБЯ СЛЫШУ
          </Typography>
          <Typography
            sx={{ fontSize: "16px", lineHeight: "100%", fontWeight: "300" }}
          >
            админ панель
          </Typography>
        </Box>

        <Stack
          sx={{
            display: "flex",
            flexDirection: "column",
            px: "12px",
          }}
        >
          <SidebarLink to="/scenarios" Icon={SettingsIcon}>
            Настройки бота(в разработке)
          </SidebarLink>
          <SidebarLink to="/materials" Icon={UploadIcon}>
            Управление контентом
          </SidebarLink>
        </Stack>
      </Box>

      <Button
        onClick={handleLogout}
        sx={{
          p: "12px 20px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: " flex-start",
          gap: "12px",
          color: "#737476",
        }}
      >
        <LogoutIcon sx={{ width: "24px", height: "24px" }} />
        <Box
          component="span"
          sx={{
            fontSize: "16px",
            loneHeight: "140%",
            fontWeight: "600",
            textTransform: "uppercase",
          }}
        >
          Выход из профиля
        </Box>
      </Button>
    </Box>
  );
};
