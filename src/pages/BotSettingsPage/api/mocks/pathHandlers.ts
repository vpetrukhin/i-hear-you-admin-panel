import type { Handlers } from "@/shared/lib/mocks"
import { delay, http, HttpResponse } from "msw"
import { PATH_API_URL_MAP } from "../path"
import { pathsMock } from "./mockData/paths"

export const getPathHandlers = (): Handlers => [
  http.get(PATH_API_URL_MAP.list(), () => {
    return HttpResponse.json(pathsMock)
  }),
  http.delete(PATH_API_URL_MAP.delete(':id'), async (info) => {
    await delay(2000)

    return HttpResponse.json(info.params?.id)
  }),
  http.post(PATH_API_URL_MAP.create(), async (info) => {
    const newPath = await info.request.clone().json()

    await delay(2000)

    return HttpResponse.json(newPath)
  }),
  http.patch(PATH_API_URL_MAP.update(':id'), async (info) => {
    const updatePath = await info.request.clone().json()
    const updatePathId = info.params?.id

    await delay(2000)

    return HttpResponse.json({
      id: updatePathId,
      ...updatePath,
    })
  })
]
