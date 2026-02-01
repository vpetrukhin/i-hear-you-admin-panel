import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFile } from "../api/services";

export const useUpdateMaterialMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { id: number; formData: FormData }) => {
      const response = await updateFile(data.id, data.formData);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materials"] });
    },
  });
};
