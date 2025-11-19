import { type ReactNode, useState } from "react";
import { AuthContext, type AuthContextType } from "../model/AuthContext";
import { type LoginApiDTO } from "../api/authApi";
import { useLoginMutation } from "../lib/useLoginMutation";
import { deleteToken, getToken, saveToken } from "../lib/token";
import { useRefreshMutation } from "../lib/useRefreshMutation";

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [token, setToken] = useState(() => {
    return getToken()
  })


  const handleSaveToken = (token: string | null) => {
    setToken(token)

    if (!token) return

    saveToken(token)
  }

  const loginMutation = useLoginMutation(
    (data) => {
      handleSaveToken(data.access)
    }

  );
  const refreshMutation = useRefreshMutation();

  const isAuth = Boolean(token)

  const login = async (dto: LoginApiDTO) => {
    loginMutation.mutate(dto);
  };

  const refresh = async () => {
    refreshMutation.mutate();
  };

  const logout = async () => {
    setToken(null)
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
