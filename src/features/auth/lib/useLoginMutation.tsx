import { useMutation } from "@tanstack/react-query";
import { type LoginApiDTO, loginRequest } from "../api/authApi";
import { saveToken } from "./token";

export const useLoginMutation = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (dto: LoginApiDTO) => {
      const res = await loginRequest(dto);
      return res;
    },
    onSuccess: (data) => {
      console.log("success");

      saveToken(data.access);
    },
  });
};
