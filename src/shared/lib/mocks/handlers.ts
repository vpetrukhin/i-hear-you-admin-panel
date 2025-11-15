
import { http, HttpResponse } from 'msw'
import { materials } from './mockData';

/**
 *
 * Массив хендлеров
 *
 * Пример хендлера
 * ```
 * http.get("https://api.example.com/user", () => {
 *    return HttpResponse.json({
 *      id: "abc-123",
 *      firstName: "John",
 *      lastName: "Maverick",
 *     });
 * })
 * ```
 *
 * */
export const handlers = [
  http.post("/api/auth/jwt/create", () => {
    return HttpResponse.json({
      access: 'token',
    });
  }),
  http.post("/api/auth/jwt/refresh", () => {
    return HttpResponse.json({
      access: 'new_token',
    });
  }),
  /* files */
  http.get("/api/files", () => {
    return HttpResponse.json(materials)
    // return HttpResponse.json([], { status: 401 })
  })
];
