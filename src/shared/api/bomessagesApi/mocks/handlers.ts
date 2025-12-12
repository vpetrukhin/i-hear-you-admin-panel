import type { Handlers } from "@/shared/lib/mocks";
import { delay, http, HttpResponse } from "msw";
import { BOT_MESSAGES_API_URL_MAP } from "../const";
import { mockBotReminderMessage } from "./mockData";

export const getBotMessageApiHandlers = (): Handlers => [
  http.get(BOT_MESSAGES_API_URL_MAP.botMessageByKey('reminder_message'), async () => {
    await delay(2000)

    return HttpResponse.json(mockBotReminderMessage)
  }),
  http.patch(BOT_MESSAGES_API_URL_MAP.updateBotMessage('reminder_message'), async (info) => {
    const updateBotMessage = await info.request.clone().json()
    const updateMessageId = info.params?.key

    await delay(2000)

    return HttpResponse.json({
      ...mockBotReminderMessage,
      id: updateMessageId,
      ...updateBotMessage,
    })
  })
]
