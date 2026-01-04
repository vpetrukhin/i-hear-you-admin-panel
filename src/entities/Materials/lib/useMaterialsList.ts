import { useQuery } from "@tanstack/react-query";
import type { MaterialType } from "../types";
import { listRequest } from "../api/services";
import { materialQueryKeys } from "../config/queryKeys";

export const useMaterialsList = () => {
  const query = useQuery<MaterialType[], Error>({
    queryKey: materialQueryKeys.list,
    queryFn: listRequest,
  });

  return {
    materials: query.data,
    isLoading: query.isLoading,
    error: query.error,
  }
}
