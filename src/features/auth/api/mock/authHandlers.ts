import type { Handlers } from "@/shared/lib/mocks";
import { http, HttpResponse } from "msw";

export const authHandlers: Handlers = [
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
]
