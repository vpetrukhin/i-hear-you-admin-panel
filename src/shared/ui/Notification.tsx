import { Avatar, Box, Typography } from "@mui/material";

interface NotificationProps {
  text: string;
  isOpen: boolean;
  type: "success" | "error";
}

export const Notification: React.FC<NotificationProps> = ({ text, isOpen, type }) => {
  return (
    <>
      {isOpen && (
        <Box
          sx={{
            position: "absolute",
            top: "20px",
            right: "20px",
            backgroundColor: "rgba(43, 39, 53, 0.8)",
            borderRadius: "8px",
            width: "400px",
            p: "12px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <Avatar
            src={
              type === "success"
                ? "/images/icon-check.svg"
                : "/images/icon-error.svg"
            }
            alt="Иконка"
            sx={{ width: 24, height: 24 }}
          />
          {text && (
            <Typography
              component="p"
              sx={{
                fontSize: "14px",
                lineHeight: "140%",
                fontWeight: "500",
                color: "#FFFFFF",
              }}
            >
              {text}
            </Typography>
          )}
        </Box>
      )}
    </>
  );
};
