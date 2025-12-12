import type { Handlers } from "@/shared/lib/mocks";
import { delay, http, HttpResponse } from "msw";
import { TOPICS_API_URL_MAP } from "../urls";
import { materialTopics } from "./mockData/topic";

export const getTopicHandlers = (): Handlers => [
  http.get(TOPICS_API_URL_MAP.list, () => {
    return HttpResponse.json(materialTopics)
  }),
  http.delete(TOPICS_API_URL_MAP.delete(':id'), async (info) => {
    await delay(2000)

    return HttpResponse.json(info.params?.id)
  }),
  http.post(TOPICS_API_URL_MAP.create, async (info) => {
    const newTopic = await info.request.clone().json()

    await delay(2000)

    return HttpResponse.json(newTopic)
  }),
  http.patch(TOPICS_API_URL_MAP.update(':id'), async (info) => {
    const updateTopic = await info.request.clone().json()
    const updateTopicId = info.params?.id

    await delay(2000)

    return HttpResponse.json({
      id: updateTopicId,
      ...updateTopic,
    })
  })
]
