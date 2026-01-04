import { materialQueryKeys, materialService } from "@/entities/Materials";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
  onError: (error: Error) => void
}

export const useDeleteMaterial = ({ onError }: Props) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => materialService.deleteFile(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: materialQueryKeys.list });
    },
    onError,
  });
}
