import { NavLink } from "react-router";
import { Box, type SvgIconProps } from "@mui/material";
import type { ReactNode } from "react";

interface SidebarLinkProps {
  to: string;
  children: ReactNode;
  Icon?: React.ElementType<SvgIconProps>;
}

export const SidebarLink = ({ to, children, Icon }: SidebarLinkProps) => {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        padding: "18px 12px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "12px",
        textDecoration: "none",
        fontSize: 16,
        lineHeight: "140%",
        fontWeight: "600",
        color: isActive ? "#2B2735" : "#FFFFFF",
        borderRadius: "8px",
        backgroundColor: isActive ? "#D8FA91" : "transparent",
      })}
    >
      {Icon && <Icon sx={{ width: "24px", height: "24px" }} />}
      <Box component="span">{children}</Box>
    </NavLink>
  );
};
