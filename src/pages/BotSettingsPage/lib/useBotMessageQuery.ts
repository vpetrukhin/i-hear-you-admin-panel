import { botMessageApi, type BotMessageDTO } from "@/shared/api/bomessagesApi"
import type { BotMessagesKeyType } from "@/shared/api/bomessagesApi/types"
import { useQuery } from "@tanstack/react-query"

interface Props {
  key: BotMessagesKeyType
}

export const useBotMessageQuery = ({ key }: Props) => {
  return useQuery<BotMessageDTO, Error, BotMessageDTO, [string, BotMessagesKeyType]>({
    queryKey: ['botMessage', key],
    queryFn: async ({ queryKey }) => {
      const key = queryKey[1]

      const data = botMessageApi.getBotMessage(key)

      return data
    }
  })
}
