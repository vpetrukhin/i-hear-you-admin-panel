import { request } from "../axios"
import { BOT_MESSAGES_API_URL_MAP } from "./const"
import type { BotMessageDTO, BotMessagesKeyType, UpdateBotMessageDTO } from "./types"

export const botMessageApi = {
  getBotMessage: async (key: BotMessagesKeyType) => {
    const { data } = await request.get<BotMessageDTO>(BOT_MESSAGES_API_URL_MAP.botMessageByKey(key))

    return data
  },
  updateBotMessage: async (key: BotMessagesKeyType, dto: UpdateBotMessageDTO) => {
    const { data } = await request.patch(BOT_MESSAGES_API_URL_MAP.botMessageByKey(key), dto)

    return data
  }
}

export { getBotMessageApiHandlers } from './mocks/handlers'

export type { BotMessageDTO, BotMessagesKeyType, UpdateBotMessageDTO } 
