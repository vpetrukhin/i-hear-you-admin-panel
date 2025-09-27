import type { ReactNode } from "react";
import { AuthContext, type AuthContextType } from "../model/AuthContext";
import { type LoginApiDTO } from "../api/authApi";
import { useLoginMutation } from "../lib/useLoginMutation";
import { deleteToken, getToken } from "../lib/token";
import { useNavigate } from "react-router";
import { LOGIN_PAGE_ROUTE } from "@/pages/LoginPage";

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const loginMutation = useLoginMutation();

  const isAuth = Boolean(getToken());

  const login = async (dto: LoginApiDTO) => {
    loginMutation.mutate(dto);
  };

  const refresh = async () => {
    //
  };

  const logout = async () => {
    deleteToken();
  };

  const value: AuthContextType = {
    user: {
      username: "User",
    },
    isAuth,
    login,
    refresh,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
