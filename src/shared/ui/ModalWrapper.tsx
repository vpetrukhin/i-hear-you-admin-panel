import { useEffect, type ReactNode } from "react";
import Modal from "@mui/material/Modal";
import { Box, Typography } from "@mui/material";

interface ModalProps {
  children: ReactNode;
  title?: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ModalWrapper: React.FC<ModalProps> = ({
  children,
  title,
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    document.body.classList.toggle("no-scroll", isOpen);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: "0px 24px 38px 3px rgba(0, 0, 0, 0.14)",
          backgroundColor: "#fff",
          borderRadius: "12px",
          width: "700px",
          p: "16px 24px 24px",
          display: "flex",
          flexDirection: "column"
        }}
      >
        {title && (
          <Typography
            component="h2"
            sx={{
              fontSize: "28px",
              lineHeight: "150%",
              fontWeight: "600",
              color: "#2B2735",
              mb: "24px",
            }}
          >
            {title}
          </Typography>
        )}
        <Box>{children}</Box>
      </Box>
    </Modal>
  );
};
