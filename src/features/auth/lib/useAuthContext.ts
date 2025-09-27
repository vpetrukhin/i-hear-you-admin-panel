import { useContext } from "react";
import { AuthContext } from "../model/AuthContext";

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "AuthContext не найден. Оберните приложение в AuthProvider",
    );
  }

  return context;
};
