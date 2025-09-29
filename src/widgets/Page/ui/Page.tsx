import { Box } from "@mui/material";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const Page = ({ children }: Props) => {
  return (
    <Box sx={{ display: "flex", flex: 1, minHeight: "100vh" }}>{children}</Box>
  );
};
