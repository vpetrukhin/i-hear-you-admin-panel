// import { SidebarHeader } from "@/widgets/SidebarHeader";
import {
  Box,
  type SxProps,
} from "@mui/material";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  blockGap?: number
  sx?: SxProps
}

export const PageContent = ({ children, blockGap = 0, sx = {} }: Props) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%", backgroundColor: "#FAF9FD" }}>
      {/* <SidebarHeader /> */}
      <Box sx={{ display: "flex", width: "100%", p: "32px", gap: blockGap, ...sx }}>
        {children}
      </Box>
    </Box>
  );
};
