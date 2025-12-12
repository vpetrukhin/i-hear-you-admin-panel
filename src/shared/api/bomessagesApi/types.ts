export type BotMessagesKeyType = 'reminder_message'

export interface BotMessageDTO {
  id: number,
  key: BotMessagesKeyType,
  text: string,
  comment: string,
  updated_at: string,
}

export interface UpdateBotMessageDTO {
  text: string,
  comment: string,
}
