import axios from "axios";
import { appConfig } from "../config/appConfig";
import { deleteToken, getToken, saveToken } from "@/features/auth/lib/token";
import { refreshRequest } from "@/features/auth/api/authApi";

export const request = axios.create({
  baseURL: appConfig.api.baseUrl,
});

// Добавляем перехват запросов
request.interceptors.request.use(async (config) => {
  // Здесь можете сделать что-нибудь с перед отправкой запроса
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, function (error) {
  // Сделайте что-нибудь с ошибкой запроса
  return Promise.reject(error);
});

// Добавляем перехват ответов
request.interceptors.response.use((response) => response, async (error) => {
  // Любые коды состояния, выходящие за пределы диапазона 2xx, вызывают срабатывание этой функции
  // Здесь можете сделать что-то с ошибкой ответа
  const config = error?.config;

  console.log(error.response.data);

  if (error.response.data.code === "token_not_valid") {
    deleteToken();
    return;
  }

  if (error?.response?.status === 401 && !config?.sent) {
    config.sent = true;

    const result = await refreshRequest();

    if (result.access) {
      saveToken(result.access);
      config.headers = {
        ...config.headers,
        authorization: `Bearer ${result.access}`,
      };
    } else {
      deleteToken();
    }

    return axios(config);
  }
  return Promise.reject(error);
});
