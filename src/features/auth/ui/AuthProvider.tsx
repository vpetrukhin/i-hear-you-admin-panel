import { type ReactNode, useEffect, useState } from "react";
import { AuthContext, type AuthContextType } from "../model/AuthContext";
import { type LoginApiDTO } from "../api/authApi";
import { useLoginMutation } from "../lib/useLoginMutation";
import { deleteToken, getToken } from "../lib/token";
import { useRefreshMutation } from "../lib/useRefreshMutation";

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const loginMutation = useLoginMutation();
  const refreshMutation = useRefreshMutation();

  const token = getToken();

  const [isAuth, seIsAuth] = useState(Boolean(token));

  useEffect(() => {
    seIsAuth(Boolean(token));
  }, [token]);

  const login = async (dto: LoginApiDTO) => {
    loginMutation.mutate(dto);
  };

  const refresh = async () => {
    refreshMutation.mutate();
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
