import { useMutation } from "@tanstack/react-query";
import { refreshRequest } from "../api/authApi";
import { saveToken } from "./token";

export const useRefreshMutation = () => {
  return useMutation({
    mutationKey: ["refresh"],
    mutationFn: async () => {
      return await refreshRequest();
    },
    onSuccess: (data) => {
      saveToken(data.access);
    },
  });
};
