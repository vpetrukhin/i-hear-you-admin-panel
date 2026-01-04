import type { Handlers } from "@/shared/lib/mocks";
import { materials } from "@/shared/lib/mocks/mockData";
import { delay, http, HttpResponse } from "msw";
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
  }),
  http.post(MATERIALS_API_URL_MAP.create, async () => {
    // const createdFile = info.request.clone().blob()
    await delay(2000)

    // return HttpResponse.json({ message: "error" }, { status: 400 })
    return HttpResponse.json({ message: "created" })
  }),
  http.delete(MATERIALS_API_URL_MAP.file(':id'), async (info) => {
    const index: number = Number(info.params?.id) - 1
    await delay(2000)

    // return HttpResponse.json({ message: "error" }, { status: 400 })
    return HttpResponse.json(materials[index])
  }),
]
