import type { Handlers } from "@/shared/lib/mocks";
import { materials } from "@/shared/lib/mocks/mockData";
import { http, HttpResponse } from "msw";
import { MATERIALS_API_URL_MAP } from "../urls";

export const getMaterialHandlers = (withRefresh?: boolean): Handlers => [
  http.get(MATERIALS_API_URL_MAP.list, () => {
    if (withRefresh) {
      return HttpResponse.json([], { status: 401 })
    }
    return HttpResponse.json(materials)
  }),
  http.get(MATERIALS_API_URL_MAP.file(':id'), (info) => {
    const index: number = Number(info.params?.id) - 1

    return HttpResponse.json(materials[index])
  })
]
