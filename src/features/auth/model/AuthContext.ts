import { createContext } from "react";
import type { Nullable } from "@/shared/lib/types";
import type { LoginApiDTO } from "../api/authApi";

interface User {
  username: string;
}

export interface AuthContextType {
  user: Nullable<User>;
  isAuth: boolean;
  login: (dto: LoginApiDTO) => Promise<void>;
  refresh: () => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuth: false,
  login: async () => {
    console.error("login not implemented");
  },
  refresh: async () => {
    console.error("refresh not implemented");
  },
  logout: async () => {
    console.error("logout not implemented");
  },
});
