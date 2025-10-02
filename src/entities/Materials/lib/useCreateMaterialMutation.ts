import { useMutation, useQueryClient } from "@tanstack/react-query";
import { materialService } from "..";
import type { CreateMaterialDTO } from "../types";

export const useCreateMaterialMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createMaterial"],
    mutationFn: (dto: CreateMaterialDTO) => {
      return materialService.createFile(dto);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materials"] });
    },
  });
};
