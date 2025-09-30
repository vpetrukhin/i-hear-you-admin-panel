// import { SidebarHeader } from "@/widgets/SidebarHeader";
import {
  Box,
} from "@mui/material";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const PageContent = ({ children }: Props) => {
  return (
      <Box sx={{ display: "flex", flexDirection:"column", width: "100%"}}>
        {/* <SidebarHeader /> */}
        <Box sx={{ display: "flex", width: "100%", p: "32px", backgroundColor: "#FAF9FD", height: "100%" }}>
            {children}
        </Box>
      </Box>
  );
};
