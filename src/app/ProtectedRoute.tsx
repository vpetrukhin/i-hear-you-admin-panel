import { Navigate } from "react-router";
import { LOGIN_PAGE_ROUTE } from "@/pages/LoginPage";
import { type ReactNode } from "react";
import { useAuthContext } from "@/features/auth";

interface Props {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: Props) => {
  const { isAuth } = useAuthContext();

  if (!isAuth) {
    return <Navigate to={LOGIN_PAGE_ROUTE} />;
  }

  return children;
};
