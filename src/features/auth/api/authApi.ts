import { request } from "@/shared/api/axios";
import type { AxiosResponse } from "axios";

export interface LoginApiDTO {
  email: string;
  password: string;
}

export interface LoginResponseApiType {
  access: string;
}

const AUTH_API_URL_MAP = {
  login: "/api/auth/jwt/create",
  refresh: "/auth/jwt/refresh",
  verify: "/auth/jwt/verify",
};

export const loginRequest = async (
  dto: LoginApiDTO,
): Promise<LoginResponseApiType> => {
  const res = await request.post<
    LoginApiDTO,
    AxiosResponse<LoginResponseApiType>,
    LoginApiDTO
  >(
    AUTH_API_URL_MAP.login,
    dto,
  );

  return res.data;
};

export const refreshRequest = async (): Promise<LoginResponseApiType> => {
  const res = await request.post<LoginResponseApiType>(
    AUTH_API_URL_MAP.refresh,
  );

  return res.data;
};
