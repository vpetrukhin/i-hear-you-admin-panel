import { useAuthContext } from "@/features/auth";
import { Link } from "@/shared/ui/Link";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const Page = ({ children }: Props) => {
  const { user } = useAuthContext();

  const handleLogout = () => {
    console.log("logout");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Link to="/">
              Я тебя слышу
            </Link>
            {/* <Stack> */}
            {/*   <Link to="/test"> */}
            {/*     Пункт навикации */}
            {/*   </Link> */}
            {/* </Stack> */}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="body1">{user?.username}</Typography>
            <Button
              color="inherit"
              onClick={handleLogout}
            >
              Выйти
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        {children}
      </Container>
    </Box>
  );
};
