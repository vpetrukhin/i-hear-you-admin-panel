
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
  /* files */
];
