import type { BotMessagesKeyType } from "./types";

export const BOT_MESSAGES_API_URL_MAP = {
  botMessageByKey: (key: BotMessagesKeyType) => `/api/botmessages/${key}`,
  updateBotMessage: (key: BotMessagesKeyType) => `/api/botmessages/${key}`,
}
