import { createContext } from "react";
import type { Nullable } from "@/shared/lib/types";

interface User {
  username: string;
}

export interface AuthContextType {
  user: Nullable<User>;
  isAuth: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuth: false,
});
