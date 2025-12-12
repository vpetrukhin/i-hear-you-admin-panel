// import { SidebarHeader } from "@/widgets/SidebarHeader";
import {
  Box,
} from "@mui/material";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  blockGap?: number
}

export const PageContent = ({ children, blockGap = 0 }: Props) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%", backgroundColor: "#FAF9FD" }}>
      {/* <SidebarHeader /> */}
      <Box sx={{ display: "flex", width: "100%", p: "32px", gap: blockGap }}>
        {children}
      </Box>
    </Box>
  );
};
