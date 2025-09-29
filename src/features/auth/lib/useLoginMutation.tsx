import { useMutation } from "@tanstack/react-query";
import {
  type LoginApiDTO,
  loginRequest,
  type LoginResponseApiType,
} from "../api/authApi";
import { saveToken } from "./token";
import type { AxiosError } from "axios";

export const useLoginMutation = () => {
  return useMutation<
    LoginResponseApiType,
    AxiosError<{ detail: string }, LoginResponseApiType>,
    LoginApiDTO
  >({
    mutationKey: ["login"],
    mutationFn: async (dto: LoginApiDTO) => {
      const res = await loginRequest(dto);
      return res;
    },
    onSuccess: (data) => {
      saveToken(data.access);
    },
  });
};
