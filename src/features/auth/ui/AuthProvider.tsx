import type { ReactNode } from "react";
import { AuthContext, type AuthContextType } from "../model/AuthContext";

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const value: AuthContextType = {
    user: {
      username: "User",
    },
    isAuth: false,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
