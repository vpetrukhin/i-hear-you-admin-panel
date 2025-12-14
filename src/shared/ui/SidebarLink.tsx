import { NavLink } from "react-router";
import { Box } from "@mui/material";
import type { ReactNode } from "react";
import type { IconElement } from "./icons/types";
import { COLORS_TOKENS } from "./tokens";

interface SidebarLinkProps {
  to: string;
  children: ReactNode;
  Icon: IconElement
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
        color: isActive ? COLORS_TOKENS.dark.primary : COLORS_TOKENS.light.primary, borderRadius: "8px",
        backgroundColor: isActive ? COLORS_TOKENS.accent.light : "transparent",
      })}
    >
      {Icon && <Icon />}
      <Box component="span">{children}</Box>
    </NavLink>
  );
};
