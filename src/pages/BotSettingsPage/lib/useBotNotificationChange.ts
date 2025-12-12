import { useMutation } from "@tanstack/react-query"
import { botMessageApi, type BotMessageDTO, type UpdateBotMessageDTO } from "@/shared/api/bomessagesApi"

export const useNotificationChange = () => {
  const mutation = useMutation<BotMessageDTO, Error, UpdateBotMessageDTO>({
    mutationFn: async (variables) => {
      const data = await botMessageApi.updateBotMessage('reminder_message', variables)

      return data
    }
  })

  return {
    onNotificationChange: mutation.mutateAsync,
    isPending: mutation.isPending,
  }
}
