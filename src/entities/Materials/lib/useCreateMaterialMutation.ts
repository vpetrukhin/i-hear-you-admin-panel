import { useMutation, useQueryClient } from "@tanstack/react-query";
import { materialService } from "..";

export const useCreateMaterialMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createMaterial"],
    mutationFn: (dto: FormData) => {
      return materialService.createFile(dto);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materials"] });
    },
  });
};
