import { Link as MLink } from "@mui/material";
import type { ReactNode } from "react";
import { Link as RouterLink } from "react-router";

interface Props {
  children: ReactNode;
  to: string;
}

export const Link = ({ children, to }: Props) => {
  return (
    <MLink color="inherit" underline="none" component={RouterLink} to={to}>
      {children}
    </MLink>
  );
};
