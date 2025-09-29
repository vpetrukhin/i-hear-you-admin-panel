import { useAuthContext } from "@/features/auth";
import { LOGIN_PAGE_ROUTE } from "@/pages/LoginPage";
import { Box, Button, Stack } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
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
        width: "25%",
        minWidth: 200,
        bgcolor: "#FAF9FD",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        pt: "80px",
        pb: "20px",
      }}
    >
      <Stack
        sx={{
          display: "flex",
          flexDirection: "column",
          px: "8px",
        }}
      >
        <SidebarLink to="/home" Icon={HomeIcon}>
          Главная
        </SidebarLink>
        <SidebarLink to="/scenarios" Icon={SettingsIcon}>
          Настройка сценариев
        </SidebarLink>
        <SidebarLink to="/materials" Icon={UploadIcon}>
          Управление контентом
        </SidebarLink>
      </Stack>

      <Button
        onClick={handleLogout}
        sx={{
          p: "12px 20px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: " flex-start",
          gap: "12px",
          color: "#686868",
        }}
      >
        <LogoutIcon sx={{ width: "24px", height: "24px" }} />
        <Box
          component="span"
          sx={{
            fontSize: "16px",
            loneHeight: "140%",
            fontWeight: "600",
            textTransform: "none",
          }}
        >
          Выход из профиля
        </Box>
      </Button>
    </Box>
  );
};
