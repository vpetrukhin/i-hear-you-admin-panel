import { useMutation } from "@tanstack/react-query";
import {
  type LoginApiDTO,
  loginRequest,
  type LoginResponseApiType,
} from "../api/authApi";
import type { AxiosError } from "axios";

export const useLoginMutation = (onSuccess?: (data: LoginResponseApiType) => void) => {
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
    onSuccess,
  });
};
