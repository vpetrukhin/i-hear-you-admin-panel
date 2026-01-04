import { useMutation, useQueryClient } from "@tanstack/react-query";
import { materialService } from "..";

interface Props {
  onError?: () => void
}

export const useCreateMaterialMutation = (params?: Props) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createMaterial"],
    mutationFn: (dto: FormData) => {
      return materialService.createFile(dto);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materials"] });
    },
    onError: () => {
      params?.onError?.()
    }
  });
};
