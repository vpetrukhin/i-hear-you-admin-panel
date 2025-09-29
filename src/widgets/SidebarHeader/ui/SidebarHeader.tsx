import { Avatar, Box } from "@mui/material";

export const SidebarHeader = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "80px",
        bgcolor: "#FAF9FD",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        py: "18px",
      }}
    >
      <Avatar
        src="/images/logo.svg"
        alt="Я тебя слышу"
        sx={{ width: 201, height: 44 }}
      />
    </Box>
  );
};
